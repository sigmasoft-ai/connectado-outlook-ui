// ─── Central configuration ───────────────────────────────────────────────────
// Update CONECTADO_BASE_URL to the URL where your FastAPI backend is running.
// Update MSAL_CLIENT_ID from your Azure App Registration.

export const CONFIG = {
    CONECTADO_BASE_URL: "http://localhost:8000",
    MSAL_CLIENT_ID: "3f3d5015-ea26-4d93-8dfd-0fbf5e9109d3", // Azure AD App Registration → Application (client) ID
    MSAL_TENANT_ID: "9ec212c2-2f63-4e82-a59a-5e479388ba2a", // 'common' for multi-tenant; replace with your tenant ID if needed
    ONEDRIVE_FILE_PATH: "projects_mapping.json",
};
