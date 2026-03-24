import * as React from "react";
import { useState, useEffect } from "react";
import MappingForm from "./MappingForm";
import ActivateMeetingForm from "./ActivateMeetingForm";
import FindRecordingsForm from "./FindRecordingsForm";
import ConfigurationForm from "./ConfigurationForm";
import { MappingRule, loadMappingFromOneDrive, resetMsal } from "../services/graph";
import { isConfigured, loadConfig, clearConfig } from "../services/config";
import "./App.css";
import logo from "../../assets/logo.png";

type Tab = "submit" | "mapping" | "findRecordings";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mapping");
  const [rules, setRules] = useState<MappingRule[]>([]);
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");
  const [isAppConfigured, setIsAppConfigured] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Initial load of config
    if (isAppConfigured === null) {
      loadConfig();
      const configured = isConfigured();
      setIsAppConfigured(configured);
      return;
    }

    // If configured, attempt silent load of data
    if (isAppConfigured) {
      loadMappingFromOneDrive()
        .then((loaded) => {
          if (loaded !== null) {
            setRules(loaded);
            setAuthStatus("authenticated");
          } else {
            setAuthStatus("unauthenticated");
          }
        })
        .catch(() => {
          setAuthStatus("unauthenticated");
        });
    }
  }, [isAppConfigured]);

  const handleSignIn = () => {
    setLoading(true);
    setError(null);
    import("../services/graph").then(({ acquireGraphToken, loadMappingFromOneDrive }) => {
      acquireGraphToken(true)
        .then((token) => {
          if (token) return loadMappingFromOneDrive();
          throw new Error("No token obtained");
        })
        .then((loaded) => {
          if (loaded !== null) {
            setRules(loaded);
            setAuthStatus("authenticated");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err instanceof Error ? err.message : "Sign-in failed");
        });
    });
  };

  const confirmClearConfig = async () => {
    await clearConfig();
    resetMsal();
    setIsAppConfigured(false);
    setAuthStatus("unauthenticated");
    setShowDeleteModal(false);
  };

  if (isAppConfigured === null) {
    return (
      <div className="app-root auth-gate">
        <div className="auth-container">
          <span className="btn-spinner" style={{ width: "24px", height: "24px" }} />
        </div>
      </div>
    );
  }

  if (!isAppConfigured) {
    return <ConfigurationForm onConfigSaved={() => setIsAppConfigured(true)} />;
  }

  if (authStatus === "checking") {
    return (
      <div className="app-root auth-gate">
        <div className="auth-container">
          <span className="btn-spinner" style={{ width: "24px", height: "24px" }} />
        </div>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <>
        <div style={{ padding: "12px 1px", display: "flex", justifyContent: "right" }}>
          <div className="header-right">
            <button
              className="btn-icon-sm"
              title="Configuration Settings"
              onClick={() => setShowDeleteModal(true)}
            >
              🗑️
            </button>
          </div>

        </div>
        <div className="app-root auth-gate">
          <div className="auth-container">
            <div className="auth-logo">
              <img style={{ width: "150px" }} src={logo} alt="Conectado" />
            </div>

            <p className="auth-subtitle">Sign in to manage your meeting mappings and activate recordings.</p>
            <button className="btn btn-primary btn-lg" onClick={handleSignIn} disabled={loading}>
              {loading ? <><span className="btn-spinner" /> Signing in…</> : "Sign In with Microsoft"}
            </button>
            {error && <div className="alert alert-error" style={{ marginTop: "20px" }}>{error}</div>}
            <button
              className="btn btn-ghost"
              style={{ marginTop: "20px", border: "none", fontSize: "12px" }}
              onClick={() => setIsAppConfigured(false)}
            >
              Edit Configuration
            </button>
          </div>
        </div>
      </>

    );
  }

  return (
    <div className="app-root">
      {/* ── Header ── */}
      <header className="app-header">
        {/* <div className="header-left">
          <img src={logo} alt="Conectado" style={{ height: "24px" }} />
        </div> */}
        <div className="header-right">
          <button
            className="btn-icon-sm"
            title="Configuration Settings"
            onClick={() => setShowDeleteModal(true)}
          >
            🗑️
          </button>
        </div>
      </header>

      {/* ── Tab Bar ── */}
      <nav className="tab-bar">
        <button
          className={`tab${activeTab === "findRecordings" ? " active" : ""}`}
          onClick={() => setActiveTab("findRecordings")}
        >
          Process Meetings
        </button>
        <button
          className={`tab${activeTab === "mapping" ? " active" : ""}`}
          onClick={() => setActiveTab("mapping")}
        >
          Rule Editor
        </button>
      </nav>

      {/* ── Tab Content ── */}
      <div className="tab-content-area">
        {activeTab === "mapping" && (
          <MappingForm
            rules={rules}
            onRulesChange={setRules}
            rulesLoaded={authStatus === "authenticated"}
          />
        )}
        {activeTab === "findRecordings" && <FindRecordingsForm rules={rules} />}
      </div>

      {/* ── Confirmation Modal ── */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Delete Configuration</h2>
            <p className="modal-message">Are you sure want to delete?</p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmClearConfig}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
