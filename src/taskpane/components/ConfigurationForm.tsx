import * as React from "react";
import { useState } from "react";
import { saveConfig, CONFIG } from "../services/config";
import logo from "../../assets/logo.png";

interface ConfigurationFormProps {
    onConfigSaved: () => void;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ onConfigSaved }) => {
    const [baseUrl, setBaseUrl] = useState(CONFIG.AIGENT_CONNECT_BASE_URL);
    const [clientId, setClientId] = useState(CONFIG.MSAL_CLIENT_ID);
    const [tenantId, setTenantId] = useState(CONFIG.MSAL_TENANT_ID);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!baseUrl || !clientId || !tenantId) {
                throw new Error("All fields are required.");
            }

            await saveConfig({
                AIGENT_CONNECT_BASE_URL: baseUrl,
                MSAL_CLIENT_ID: clientId,
                MSAL_TENANT_ID: tenantId,
            });

            onConfigSaved();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save configuration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-root auth-gate">
            <div className="auth-container" style={{ maxWidth: "360px" }}>
                <div className="auth-logo">
                    <img src={logo} alt="Aigent Connect" style={{ width: "64px", marginBottom: "8px" }} />
                    <h1 className="auth-title">Settings</h1>
                </div>

                <p className="auth-subtitle">
                    Configure your organization settings to connect the Outlook Add-in.
                </p>

                <form onSubmit={handleSubmit} className="card" style={{ textAlign: "left" }}>
                    <div className="form-group">
                        <label htmlFor="baseUrl">API Base URL</label>
                        <input
                            id="baseUrl"
                            type="text"
                            placeholder="https://api.yourdomain.com"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="clientId">Client ID</label>
                        <input
                            id="clientId"
                            type="text"
                            placeholder="00000000-0000-0000-0000-000000000000"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tenantId">Tenant ID</label>
                        <input
                            id="tenantId"
                            type="text"
                            placeholder="common or your-tenant-id"
                            value={tenantId}
                            onChange={(e) => setTenantId(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        style={{ marginTop: "20px" }}
                        disabled={loading}
                    >
                        {loading ? <span className="btn-spinner" /> : "Save Configuration"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConfigurationForm;
