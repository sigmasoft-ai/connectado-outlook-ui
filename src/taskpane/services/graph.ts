/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONFIG } from "./config";
import { PublicClientApplication, SilentRequest } from "@azure/msal-browser";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface MappingRule {
    id: string;
    meeting_subject: string;
    project_name: string;
    sample_task: string;
}

// ─── MSAL setup ──────────────────────────────────────────────────────────────
let msalApp: PublicClientApplication | null = null;

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const SCOPES = ["Files.ReadWrite.AppFolder", "openid", "profile"];

// ─── Raw token cache (used when PKCE dialog auth was used) ───────────────────
const LS_TOKEN = "conectado_graph_token";
const LS_TOKEN_EXPIRY = "conectado_graph_token_expiry";

function getCachedToken(): string | null {
    const token = localStorage.getItem(LS_TOKEN);
    const expiry = localStorage.getItem(LS_TOKEN_EXPIRY);
    if (!token || !expiry) return null;
    if (Date.now() > parseInt(expiry, 10)) {
        localStorage.removeItem(LS_TOKEN);
        localStorage.removeItem(LS_TOKEN_EXPIRY);
        return null;
    }
    return token;
}

export function cacheToken(accessToken: string, expiresIn: number): void {
    localStorage.setItem(LS_TOKEN, accessToken);
    // Subtract 60 s buffer so we refresh slightly early
    localStorage.setItem(LS_TOKEN_EXPIRY, String(Date.now() + (expiresIn - 60) * 1000));
}

export async function initMsal(): Promise<void> {
    if (msalApp) return;
    try {
        const app = new PublicClientApplication({
            auth: {
                clientId: CONFIG.MSAL_CLIENT_ID,
                authority: `https://login.microsoftonline.com/${CONFIG.MSAL_TENANT_ID}`,
                redirectUri: window.location.origin + window.location.pathname,
            },
            cache: { cacheLocation: "localStorage" },
        });
        await app.initialize();
        await app.handleRedirectPromise();
        msalApp = app;
    } catch (e: unknown) {
        console.error("MSAL Initialization failed", e);
    }
}

/**
 * Resets the MSAL application instance. Useful when configuration changes.
 */
export function resetMsal(): void {
    msalApp = null;
}

// ─── Token Acquisition ───────────────────────────────────────────────────────
/**
 * Acquire a Graph token.
 *
 * Strategy:
 *  1. Try silent (cache / refresh token in localStorage).
 *  2. If silent fails and allowInteractive=true, open an Office Dialog via
 *     Office.context.ui.displayDialogAsync(). The dialog is a REAL browser
 *     window — not an iframe — so MSAL popup/login works there without
 *     block_nested_popups or third-party cookie issues.
 *     The dialog sends the token back via Office.context.ui.messageParent().
 *  3. If allowInteractive=false, return null (graceful fallback).
 */
export function acquireGraphToken(allowInteractive: boolean = true): Promise<string | null> {
    // 1. Check the locally cached raw token first (set after PKCE dialog auth)
    const cached = getCachedToken();
    if (cached) return Promise.resolve(cached);

    return _acquireTokenSilent().then((token) => {
        if (token) return token;
        if (!allowInteractive) return null;
        return _acquireTokenViaDialog();
    });
}

async function _acquireTokenSilent(): Promise<string | null> {
    if (!msalApp) await initMsal();
    if (!msalApp) return null;

    const accounts = msalApp.getAllAccounts();
    const request: SilentRequest = {
        scopes: SCOPES,
        account: accounts[0] || undefined,
    };
    try {
        const resp = await msalApp.acquireTokenSilent(request);
        return resp.accessToken;
    } catch {
        return null;
    }
}

/**
 * Opens an Office Dialog window (real browser window, no iframe restrictions)
 * which runs the MSAL login and sends the token back via messageParent.
 */
function _acquireTokenViaDialog(): Promise<string> {
    return new Promise((resolve, reject) => {
        // Build the dialog URL — embed MSAL config as query params so
        // auth-dialog.ts is fully self-contained.
        const dialogUrl =
            `${window.location.origin}/auth-dialog.html` +
            `?clientId=${encodeURIComponent(CONFIG.MSAL_CLIENT_ID)}` +
            `&tenantId=${encodeURIComponent(CONFIG.MSAL_TENANT_ID)}`;

        if (typeof Office === "undefined" || !Office.context || !Office.context.ui) {
            reject(new Error("Office UI APIs are not available in this context. Please ensure you are running in Outlook."));
            return;
        }

        Office.context.ui.displayDialogAsync(
            dialogUrl,
            { height: 60, width: 35, promptBeforeOpen: false },
            (asyncResult) => {
                if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                    reject(new Error(`Could not open sign-in dialog: ${asyncResult.error.message}`));
                    return;
                }

                const dialog = asyncResult.value;

                dialog.addEventHandler(
                    Office.EventType.DialogMessageReceived,
                    (msg: Office.DialogParentMessageReceivedEventArgs) => {
                        dialog.close();
                        try {
                            const data = JSON.parse((msg as any).message);
                            if (data.type === "token") {
                                // Persist the token so it survives tab navigation
                                cacheToken(data.accessToken, data.expiresIn ?? 3600);
                                resolve(data.accessToken);
                            } else {
                                reject(new Error(data.message || "Sign-in dialog reported an error."));
                            }
                        } catch {
                            reject(new Error("Invalid message from sign-in dialog."));
                        }
                    }
                );

                dialog.addEventHandler(
                    Office.EventType.DialogEventReceived,
                    (evt: Office.DialogParentMessageReceivedEventArgs) => {
                        // Dialog was closed by the user without completing sign-in
                        const code = (evt as any).error;
                        if (code === 12006) {
                            reject(new Error("Sign-in was cancelled. Please try again."));
                        }
                    }
                );
            }
        );
    });
}

// ─── OneDrive helpers (App Folder) ───────────────────────────────────────────
// Files are stored in:  OneDrive › Apps › <app-name> › projects_mapping.json
// Graph path:           /me/drive/special/approot:/<filename>:/content
// Requires scope:       Files.ReadWrite.AppFolder (delegated, granted)

function appRootUrl(filename: string): string {
    return `${GRAPH_BASE}/me/drive/special/approot:/${filename}:/content`;
}

export async function loadMappingFromOneDrive(): Promise<MappingRule[] | null> {
    const token = await acquireGraphToken(false);
    if (!token) return null; // unauthenticated — caller must not overwrite local state

    try {
        const url = appRootUrl(CONFIG.ONEDRIVE_FILE_PATH);
        const resp = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (resp.status === 404) {
            console.warn("projects_mapping.json not found in App Folder. Starting empty.");
            return [];
        }
        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(`Load mapping (${resp.status}): ${errText}`);
        }
        return await resp.json();
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.warn("loadMappingFromOneDrive:", msg);
        throw new Error(msg);
    }
}

export async function saveMappingToOneDrive(rules: MappingRule[]): Promise<void> {
    // allowInteractive=true: if no cached token, opens the Office Dialog sign-in flow
    const token = await acquireGraphToken(true);
    if (!token) {
        throw new Error("Could not obtain a Microsoft Graph token. Please try again.");
    }

    const url = appRootUrl(CONFIG.ONEDRIVE_FILE_PATH);
    const resp = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rules, null, 2),
    });
    if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`Save mapping: ${resp.status} — ${err}`);
    }
}
