/**
 * auth-dialog.ts
 *
 * Implements OAuth2 Authorization Code + PKCE flow inside an Office Dialog.
 *
 * Why PKCE instead of implicit flow:
 *  - Implicit flow (response_type=token) must be explicitly enabled in Azure portal.
 *  - PKCE (response_type=code) works for all public clients without extra portal config.
 *
 * Flow:
 *  1. First load (?clientId=...&tenantId=...):
 *     - Generate code_verifier, compute code_challenge (SHA-256).
 *     - Store verifier + config in localStorage.
 *     - Redirect window to Microsoft /authorize.
 *
 *  2. Return load (?code=...):
 *     - Read code_verifier from localStorage.
 *     - POST to /token to exchange code → access_token.
 *     - Send token to task pane via messageParent.
 *
 *  2b. Return load with #error or ?error:
 *     - Detect error, send error to task pane, break the loop.
 */

const SCOPES = ["Files.ReadWrite.AppFolder", "openid", "profile"];
const LS_CLIENT_ID = "auth_dlg_clientId";
const LS_TENANT_ID = "auth_dlg_tenantId";
const LS_VERIFIER = "auth_dlg_verifier";

function setMsg(text: string) {
    const el = document.getElementById("msg");
    if (el) el.textContent = text;
}

function sendToParent(payload: object) {
    if (typeof Office !== "undefined" && Office.context?.ui) {
        Office.context.ui.messageParent(JSON.stringify(payload));
    }
}

function loadOfficeJs(): Promise<void> {
    return new Promise((resolve) => {
        if (typeof Office !== "undefined" && Office.context) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://appsforoffice.microsoft.com/lib/1/hosted/office.js";
        script.onload = () => { Office.initialize = () => resolve(); setTimeout(resolve, 2000); };
        script.onerror = () => resolve();
        document.head.appendChild(script);
    });
}

function cleanup() {
    localStorage.removeItem(LS_CLIENT_ID);
    localStorage.removeItem(LS_TENANT_ID);
    localStorage.removeItem(LS_VERIFIER);
}

// ── PKCE helpers ─────────────────────────────────────────────────────────────

function generateVerifier(length = 64): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => chars[b % chars.length]).join("");
}

async function generateChallenge(verifier: string): Promise<string> {
    const encoded = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    return btoa(Array.from(new Uint8Array(digest), (b) => String.fromCharCode(b)).join(""))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function run() {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    // ── Case A: Returned from MS with auth code ────────────────────────────
    if (searchParams.has("code")) {
        const code = searchParams.get("code")!;
        const verifier = localStorage.getItem(LS_VERIFIER);
        const clientId = localStorage.getItem(LS_CLIENT_ID);
        const tenantId = localStorage.getItem(LS_TENANT_ID);

        if (!verifier || !clientId || !tenantId) {
            setMsg("Session expired. Please close and try again.");
            await loadOfficeJs();
            sendToParent({ type: "error", message: "PKCE verifier missing. Please close and try again." });
            return;
        }

        setMsg("Completing sign-in…");
        const redirectUri = `${window.location.origin}/auth-dialog.html`;

        try {
            const tokenResp = await fetch(
                `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        client_id: clientId,
                        grant_type: "authorization_code",
                        code,
                        redirect_uri: redirectUri,
                        code_verifier: verifier,
                        scope: SCOPES.join(" "),
                    }).toString(),
                }
            );

            const tokenData = await tokenResp.json();

            if (tokenData.access_token) {
                cleanup();
                setMsg("Signed in! Returning to add-in…");
                await loadOfficeJs();
                sendToParent({
                    type: "token",
                    accessToken: tokenData.access_token,
                    expiresIn: tokenData.expires_in ?? 3600,
                });
            } else {
                const msg = tokenData.error_description || tokenData.error || "Token exchange failed.";
                cleanup();
                setMsg(`Error: ${msg}`);
                await loadOfficeJs();
                sendToParent({ type: "error", message: msg });
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setMsg(`Network error: ${msg}`);
            await loadOfficeJs();
            sendToParent({ type: "error", message: msg });
        }
        return;
    }

    // ── Case B: Error returned from MS (break the loop!) ──────────────────
    if (searchParams.has("error") || hash.includes("error=")) {
        const err = searchParams.get("error_description") || searchParams.get("error") || "Sign-in failed.";
        setMsg(`Error: ${err}`);
        cleanup();
        await loadOfficeJs();
        sendToParent({ type: "error", message: err });
        return;
    }

    // ── Case C: First load — start the PKCE flow ───────────────────────────
    const clientId = searchParams.get("clientId") || localStorage.getItem(LS_CLIENT_ID);
    const tenantId = searchParams.get("tenantId") || localStorage.getItem(LS_TENANT_ID);

    if (!clientId || !tenantId) {
        setMsg("Configuration error.");
        await loadOfficeJs();
        sendToParent({ type: "error", message: "Missing clientId or tenantId. Please close and try again." });
        return;
    }

    const verifier = generateVerifier();
    const challenge = await generateChallenge(verifier);
    const redirectUri = `${window.location.origin}/auth-dialog.html`;

    // Persist before navigating away
    localStorage.setItem(LS_CLIENT_ID, clientId);
    localStorage.setItem(LS_TENANT_ID, tenantId);
    localStorage.setItem(LS_VERIFIER, verifier);

    setMsg("Redirecting to Microsoft sign-in…");

    const authUrl =
        `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize` +
        `?client_id=${encodeURIComponent(clientId)}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(SCOPES.join(" "))}` +
        `&response_mode=query` +
        `&code_challenge=${encodeURIComponent(challenge)}` +
        `&code_challenge_method=S256`;

    window.location.replace(authUrl);
}

run().catch(async (e: unknown) => {
    const msg = e instanceof Error ? e.message : String(e);
    setMsg(`Error: ${msg}`);
    await loadOfficeJs();
    sendToParent({ type: "error", message: msg });
});
