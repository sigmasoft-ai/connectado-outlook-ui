// ─── Central configuration ───────────────────────────────────────────────────
// Update configuration settings via the First-Time Configuration Form.
// These are persisted using Office.context.roamingSettings.

export let CONFIG = {
    CONECTADO_BASE_URL: "",
    MSAL_CLIENT_ID: "",
    MSAL_TENANT_ID: "",
    ONEDRIVE_FILE_PATH: "projects_mapping.json",
};

/**
 * Loads the configuration from Office roaming settings.
 */
export function loadConfig(): void {
    if (typeof Office !== "undefined" && Office.context && Office.context.roamingSettings) {
        const workspaceConfig = Office.context.roamingSettings.get("workspaceConfig");
        if (workspaceConfig) {
            CONFIG = { ...CONFIG, ...workspaceConfig };
        }
    }
}

/**
 * Saves the configuration to Office roaming settings and updates the in-memory CONFIG.
 * @param newConfig The new configuration values.
 */
export function saveConfig(newConfig: Partial<typeof CONFIG>): Promise<void> {
    CONFIG = { ...CONFIG, ...newConfig };

    return new Promise((resolve, reject) => {
        if (typeof Office !== "undefined" && Office.context && Office.context.roamingSettings) {
            Office.context.roamingSettings.set("workspaceConfig", CONFIG);
            Office.context.roamingSettings.saveAsync((result) => {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    resolve();
                } else {
                    reject(new Error(result.error.message));
                }
            });
        } else {
            resolve();
        }
    });
}

/**
 * Checks if the configuration is complete.
 */
export function isConfigured(): boolean {
    return !!(
        CONFIG.CONECTADO_BASE_URL &&
        CONFIG.MSAL_CLIENT_ID &&
        CONFIG.MSAL_TENANT_ID
    );
}

/**
 * Clears the configuration from roaming settings.
 */
export function clearConfig(): Promise<void> {
    CONFIG.CONECTADO_BASE_URL = "";
    CONFIG.MSAL_CLIENT_ID = "";
    CONFIG.MSAL_TENANT_ID = "";

    return new Promise((resolve, reject) => {
        if (typeof Office !== "undefined" && Office.context && Office.context.roamingSettings) {
            Office.context.roamingSettings.remove("workspaceConfig");
            Office.context.roamingSettings.saveAsync((result) => {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    resolve();
                } else {
                    reject(new Error(result.error.message));
                }
            });
        } else {
            resolve();
        }
    });
}
