import * as React from "react";
import { useState, useCallback } from "react";
import { MappingRule, loadMappingFromOneDrive, saveMappingToOneDrive, acquireGraphToken } from "../services/graph";
import { validateMapping } from "../services/api";

interface MappingFormProps {
    rules: MappingRule[];
    onRulesChange: (rules: MappingRule[]) => void;
    rulesLoaded: boolean;
}

type AlertType = "error" | "success" | "warning" | "info";

interface AlertState {
    msg: string;
    type: AlertType;
}

const MappingForm: React.FC<MappingFormProps> = ({ rules, onRulesChange, rulesLoaded }) => {
    const [subject, setSubject] = useState("");
    const [project, setProject] = useState("");
    const [task, setTask] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [alert, setAlert] = useState<AlertState | null>(null);
    const [rulesLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const showAlert = (msg: string, type: AlertType = "error") => setAlert({ msg, type });
    const clearAlert = () => setAlert(null);

    // Show sign-in banner when App.tsx load returned null (no token)
    const needsSignIn = !rulesLoaded;

    const openAdd = () => {
        setEditingId(null);
        setSubject("");
        setProject("");
        setTask("");
        clearAlert();
        setShowForm(true);
    };

    const openEdit = (rule: MappingRule) => {
        setEditingId(rule.id);
        setSubject(rule.meeting_subject);
        setProject(rule.project_name);
        setTask(rule.sample_task);
        clearAlert();
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        clearAlert();
    };

    const handleSave = useCallback(async () => {
        if (!subject.trim() || !project.trim() || !task.trim()) {
            showAlert("All fields are required.");
            return;
        }

        setLoading(true);
        showAlert("Validating with server…", "info");

        // Check for duplicate Subject + Project
        const isDuplicate = rules.some(
            (r) =>
                r.id !== editingId &&
                r.meeting_subject.toLowerCase() === subject.trim().toLowerCase() &&
                r.project_name.toLowerCase() === project.trim().toLowerCase()
        );

        if (isDuplicate) {
            showAlert("A rule with this Meeting Subject and Project already exists.");
            setLoading(false);
            return;
        }

        try {
            const result = await validateMapping(project.trim(), task.trim());
            if (!result.valid) {
                showAlert(result.errors.join(" | "));
                setLoading(false);
                return;
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            showAlert(`Validation failed: ${msg}`);
            setLoading(false);
            return;
        }

        let updated: MappingRule[];
        if (editingId) {
            updated = rules.map((r) =>
                r.id === editingId
                    ? { ...r, meeting_subject: subject.trim(), project_name: project.trim(), sample_task: task.trim() }
                    : r
            );
        } else {
            updated = [
                ...rules,
                {
                    id: crypto.randomUUID(),
                    meeting_subject: subject.trim(),
                    project_name: project.trim(),
                    sample_task: task.trim(),
                },
            ];
        }

        try {
            await saveMappingToOneDrive(updated);
            onRulesChange(updated);
            setLoading(false);
            closeForm();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            showAlert(`OneDrive save failed: ${msg}`, "warning");
            onRulesChange(updated); // still update locally
            setLoading(false);
        }
    }, [subject, project, task, editingId, rules, onRulesChange]);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!showDeleteConfirm) return;
        const id = showDeleteConfirm;
        const updated = rules.filter((r) => r.id !== id);
        setShowDeleteConfirm(null);
        try {
            await saveMappingToOneDrive(updated);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            console.warn("Delete: OneDrive write failed", msg);
            showAlert(`Delete: OneDrive write failed: ${msg}`, "warning");
        }
        onRulesChange(updated);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(rules.length / pageSize);
    const paginatedRules = rules.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Reset to page 1 if rules length changes and current page becomes invalid
    React.useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [rules.length, totalPages, currentPage]);

    const escHtml = (str: string) =>
        str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    return (
        <div className="tab-panel">
            <div className="panel-toolbar">
                <span className="panel-count">
                    <span>{rulesLoading ? "…" : rules.length}</span> rules
                </span>
                <button className="btn btn-accent btn-sm" onClick={openAdd}>
                    + Add Rule
                </button>
            </div>

            {alert && <div className={`alert alert-${alert.type}`} style={{ margin: "10px 20px" }}>{alert.msg}</div>}

            {/* Rules Table */}
            <div className="rules-container">
                {rulesLoading ? (
                    <div className="empty-state">Loading from OneDrive…</div>
                ) : rules.length === 0 ? (
                    <div className="empty-state">
                        No mapping rules yet.
                        <br />
                        Click &ldquo;+ Add Rule&rdquo; to get started.
                    </div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="rules-table">
                                <thead>
                                    <tr>
                                        <th>Meeting Subject</th>
                                        <th>Project</th>
                                        <th>Task ID</th>
                                        <th style={{ textAlign: "right" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedRules.map((r) => (
                                        <tr key={r.id}>
                                            <td className="td-subject" title={r.meeting_subject}>{escHtml(r.meeting_subject)}</td>
                                            <td>{escHtml(r.project_name)}</td>
                                            <td className="td-task">{escHtml(r.sample_task)}</td>
                                            <td style={{ textAlign: "right" }}>
                                                <button
                                                    className="icon-btn"
                                                    title="Edit"
                                                    onClick={() => openEdit(r)}
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="icon-btn delete"
                                                    title="Delete"
                                                    onClick={() => setShowDeleteConfirm(r.id)}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="prev-next"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                >
                                    Prev
                                </button>
                                <div className="page-numbers">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <button
                                            key={p}
                                            className={`page-num${p === currentPage ? " active" : ""}`}
                                            onClick={() => setCurrentPage(p)}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="prev-next"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Add / Edit Form Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '400px' }}>
                        <div className="rule-form-header">
                            <span className="modal-title" style={{ margin: 0 }}>{editingId ? "Edit Rule" : "Add Rule"}</span>
                            <button className="btn-icon-sm" onClick={closeForm}>
                                ✕
                            </button>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <div className="form-group">
                                <label htmlFor="f-subject">Meeting Subject</label>
                                <input
                                    id="f-subject"
                                    type="text"
                                    placeholder="e.g. Scrum Call"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="f-project">Project Name</label>
                                <input
                                    id="f-project"
                                    type="text"
                                    placeholder="e.g. Automation Test Folder"
                                    value={project}
                                    onChange={(e) => setProject(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="f-task">Task ID</label>
                                <input
                                    id="f-task"
                                    type="text"
                                    placeholder="e.g. PROJ-123"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="modal-actions" style={{ marginTop: '24px' }}>
                            <button className="btn btn-ghost" onClick={closeForm}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" disabled={loading} onClick={handleSave}>
                                {loading ? <span className="btn-spinner" /> : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-title">Delete Rule?</div>
                        <div className="modal-message">
                            Are you sure you want to delete this mapping rule? This action cannot be undone.
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-ghost" onClick={() => setShowDeleteConfirm(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" style={{ background: 'var(--error)' }} onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MappingForm;
