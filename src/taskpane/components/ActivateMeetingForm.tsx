import * as React from "react";
import { useState } from "react";
import { MappingRule } from "../services/graph";
import { activateMeeting } from "../services/api";

interface ActivateMeetingFormProps {
    rules: MappingRule[];
}

type AlertType = "error" | "success" | "warning";

interface AlertState {
    msg: string;
    type: AlertType;
}

const ActivateMeetingForm: React.FC<ActivateMeetingFormProps> = ({ rules }) => {
    const today = new Date().toISOString().split("T")[0];
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState(today);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertState | null>(null);

    const showAlert = (msg: string, type: AlertType = "error") => setAlert({ msg, type });
    const clearAlert = () => setAlert(null);

    // Try to get subject from Office context on load
    React.useEffect(() => {
        if (typeof Office !== "undefined" && Office.context?.mailbox?.item) {
            const item = Office.context.mailbox.item;
            if (item.subject) {
                setSubject(item.subject);
            }
            // Also try to get date if it's a calendar item
            if ((item as any).start) {
                const startDate = new Date((item as any).start);
                setDate(startDate.toISOString().split("T")[0]);
            }
        }
    }, [rules]);

    // Find matching rules (fuzzy match)
    const matches = rules.filter((r) =>
        r.meeting_subject.toLowerCase().includes(subject.trim().toLowerCase()) ||
        subject.trim().toLowerCase().includes(r.meeting_subject.toLowerCase())
    );

    const handleActivate = async (rule: MappingRule) => {
        clearAlert();
        setLoading(true);

        try {
            await activateMeeting({
                meetingName: subject.trim() || rule.meeting_subject,
                meetingDate: date,
                meetingProject: rule.project_name,
                sampleTask: rule.sample_task,
            });
            showAlert(`✓ Meeting "${subject.trim() || rule.meeting_subject}" activated!`, "success");
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            showAlert(`Activation failed: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tab-panel">
            <div className="card">
                <div className="form-group">
                    <label htmlFor="meeting-subject">Current Meeting Subject</label>
                    <input
                        id="meeting-subject"
                        type="text"
                        placeholder="e.g. Scrum Call"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                            clearAlert();
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="meeting-date">Meeting Date</label>
                    <input
                        id="meeting-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Mapping preview / matches */}
                <div className="matches-section">
                    {subject.trim() && matches.length > 0 ? (
                        <>
                            <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "8px" }}>
                                {matches.length} matching rules found:
                            </div>
                            {matches.map((rule) => (
                                <div key={rule.id} className="mapping-preview match-card" onClick={() => !loading && handleActivate(rule)}>
                                    <div className="preview-row">
                                        <span className="preview-label">Subject</span>
                                        <span className="preview-value">{rule.meeting_subject}</span>
                                    </div>
                                    <div className="preview-row">
                                        <span className="preview-label">Project</span>
                                        <span className="preview-value">{rule.project_name}</span>
                                    </div>
                                    <div className="preview-row">
                                        <span className="preview-label">Task</span>
                                        <span className="preview-value">{rule.sample_task}</span>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm btn-full"
                                        style={{ marginTop: "8px" }}
                                        disabled={loading}
                                    >
                                        Activate with this Rule
                                    </button>
                                </div>
                            ))}
                        </>
                    ) : subject.trim() ? (
                        <div className="alert alert-warning">
                            No matching rules found. Add one in the Mapping Editor.
                        </div>
                    ) : (
                        <div style={{ fontSize: "12px", opacity: 0.7, textAlign: "center", padding: "10px" }}>
                            Type a subject or select from Outlook to see matching rules.
                        </div>
                    )}
                </div>

                {alert && <div className={`alert alert-${alert.type}`} style={{ marginTop: "10px" }}>{alert.msg}</div>}
            </div>
        </div>
    );
};

export default ActivateMeetingForm;
