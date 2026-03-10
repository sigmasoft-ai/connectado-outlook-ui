import * as React from "react";
import { useState, useEffect } from "react";
import MappingForm from "./MappingForm";
import ActivateMeetingForm from "./ActivateMeetingForm";
import FindRecordingsForm from "./FindRecordingsForm";
import { MappingRule, loadMappingFromOneDrive } from "../services/graph";
import "./App.css";
import logo from "../../assets/logo.png";

type Tab = "submit" | "mapping" | "findRecordings";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mapping");
  const [rules, setRules] = useState<MappingRule[]>([]);
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial check (silent)
  useEffect(() => {
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
  }, []);

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
      <div className="app-root auth-gate">
        <div className="auth-container">
          <div className="auth-logo">
            <img src={logo} alt="Conectado" />
          </div>
          <p className="auth-subtitle">Sign in to manage your meeting mappings and activate recordings.</p>
          <button className="btn btn-primary btn-lg" onClick={handleSignIn} disabled={loading}>
            {loading ? <><span className="btn-spinner" /> Signing in…</> : "Sign In with Microsoft"}
          </button>
          {error && <div className="alert alert-error" style={{ marginTop: "20px" }}>{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* ── Header ── */}
      {/* <header className="app-header">
        <div className="header-left">
          <img src={logo} alt="Conectado" />
        </div>
      </header> */}

      {/* ── Tab Bar ── */}
      <nav className="tab-bar">
        <button
          className={`tab${activeTab === "mapping" ? " active" : ""}`}
          onClick={() => setActiveTab("mapping")}
        >
          Mapping Editor
        </button>
        <button
          className={`tab${activeTab === "findRecordings" ? " active" : ""}`}
          onClick={() => setActiveTab("findRecordings")}
        >
          Process Meetings
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
    </div>
  );
};

export default App;
