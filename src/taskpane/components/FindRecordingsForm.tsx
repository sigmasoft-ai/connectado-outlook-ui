import * as React from "react";
import { useState } from "react";
import { getRecordings, RecordingItem, activateFromPlugin } from "../services/api";
import { MappingRule } from "../services/graph";

type AlertType = "error" | "success" | "warning";

interface AlertState {
    msg: string;
    type: AlertType;
}

interface FindRecordingsFormProps {
    rules: MappingRule[];
}

const FindRecordingsForm: React.FC<FindRecordingsFormProps> = ({ rules }) => {
    const today = new Date().toISOString().split("T")[0];
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState(today);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertState | null>(null);
    const [recordings, setRecordings] = useState<RecordingItem[]>([]);
    const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);

    const showAlert = (msg: string, type: AlertType = "error") => setAlert({ msg, type });
    const clearAlert = () => setAlert(null);

    const handleSubmit = async () => {
        if (!subject.trim() || !date) {
            showAlert("Please enter both meeting subject and date.");
            return;
        }

        clearAlert();
        setLoading(true);
        setRecordings([]);

        try {
            const data = await getRecordings(subject.trim(), date);
            if (data.length === 0) {
                showAlert("No recordings found for this subject and date.", "warning");
            } else {
                setRecordings(data);
                showAlert(`Found ${data.length} recording(s).`, "success");
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            showAlert(`Search failed: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectRecording = async (rec: RecordingItem) => {
        if (!rec.download_url) {
            showAlert("This recording doesn't have a download URL.", "error");
            return;
        }

        const recSubject = rec.meeting_subject || subject;
        const matched = rules.find((r) => r.meeting_subject.toLowerCase() === recSubject.trim().toLowerCase());

        if (!matched) {
            showAlert(
                "No mapping found for this meeting subject. Please add one in the Mapping Editor tab first.",
                "warning"
            );
            return;
        }

        clearAlert();
        setDownloadingUrl(rec.download_url);

        try {
            await activateFromPlugin({
                download_url: rec.download_url,
                meeting_subject: recSubject,
                meeting_date: date,
                meeting_project: matched.project_name,
                sample_task: matched.sample_task,
            });
            showAlert("✓ Recording successfully queued for processing.", "success");
            setRecordings([]);
            setSubject("");
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            showAlert(`Processing failed: ${msg}`);
        } finally {
            setDownloadingUrl(null);
        }
    };

    return (
        <div className="tab-panel">
            <div className="card">
                <div className="form-group">
                    <label htmlFor="recording-subject">Meeting Subject</label>
                    <input
                        id="recording-subject"
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
                    <label htmlFor="recording-date">Meeting Date</label>
                    <input
                        id="recording-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary btn-full"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? <span className="btn-spinner" /> : "Search"}
                </button>

                {alert && <div className={`alert alert-${alert.type}`} style={{ marginTop: "10px" }}>{alert.msg}</div>}
            </div>

            {recordings.length > 0 && (
                <div className="card" style={{ marginTop: "20px" }}>
                    <h4 style={{ marginTop: 0, marginBottom: "0px", fontSize: "14px", color: "#323130" }}>Recordings Found</h4>
                    <div className="recordings-list">
                        {recordings.map((rec, i) => (
                            <div key={i} className="mapping-preview" style={{ marginBottom: "0px" }}>
                                <div className="preview-row">
                                    <span className="preview-label">Name</span>
                                    <span className="preview-value" style={{ wordBreak: "break-all" }}>{rec.name}</span>
                                </div>
                                <div className="preview-row">
                                    <span className="preview-label">Subject</span>
                                    <span className="preview-value">{rec.meeting_subject || "N/A"}</span>
                                </div>
                                <div className="preview-row">
                                    <span className="preview-label">Time</span>
                                    <span className="preview-value">{rec.recorded_at ? new Date(rec.recorded_at).toLocaleString() : "N/A"}</span>
                                </div>
                                {rec.download_url && (
                                    <button
                                        className="btn btn-primary"
                                        style={{ marginTop: "10px", width: "100%" }}
                                        disabled={downloadingUrl === rec.download_url}
                                        onClick={() => handleSelectRecording(rec)}
                                    >
                                        {downloadingUrl === rec.download_url ? (
                                            <span className="btn-spinner" />
                                        ) : (
                                            "Process Recording"
                                        )}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindRecordingsForm;
