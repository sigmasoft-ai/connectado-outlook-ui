import { CONFIG } from "./config";

// ─── Validate Mapping ─────────────────────────────────────────────────────────
export interface ValidateMappingResult {
    valid: boolean;
    errors: string[];
}

export async function validateMapping(
    projectName: string,
    sampleTask: string
): Promise<ValidateMappingResult> {
    const resp = await fetch(`${CONFIG.CONECTADO_BASE_URL}/api/v1/validate_mapping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_name: projectName, sample_task: sampleTask }),
    });
    const data = await resp.json();
    return data as ValidateMappingResult; // { valid: bool, errors: [] }
}

// ─── Activate Meeting ─────────────────────────────────────────────────────────
export interface ActivateMeetingParams {
    meetingName: string;
    meetingDate: string;
    meetingProject: string;
    sampleTask: string;
}

export async function activateMeeting(params: ActivateMeetingParams): Promise<void> {
    const form = new FormData();
    form.append("meeting_name", params.meetingName);
    form.append("meeting_date", params.meetingDate);
    form.append("meeting_project", params.meetingProject);
    form.append("sample_task", params.sampleTask);

    const resp = await fetch(`${CONFIG.CONECTADO_BASE_URL}/api/v1/activate_meeting`, {
        method: "POST",
        body: form,
    });
    const data = await resp.json();
    if (!resp.ok || !data.success) {
        throw new Error(
            Array.isArray(data.detail)
                ? data.detail.join(", ")
                : data.detail || data.message || "Activation failed"
        );
    }
}

// ─── Find Recordings ────────────────────────────────────────────────────────
export interface RecordingItem {
    name: string;
    download_url?: string;
    meeting_subject?: string;
    meeting_start_time?: string;
}

export interface FindRecordingResponse {
    success: boolean;
    message: string;
    recordings: RecordingItem[];
}

export async function getRecordings(subject: string, date: string): Promise<RecordingItem[]> {
    const url = `${CONFIG.CONECTADO_BASE_URL}/api/v1/recordings?subject=${encodeURIComponent(subject)}&date=${encodeURIComponent(date)}`;
    const resp = await fetch(url, {
        method: "GET",
    });
    const data = await resp.json();
    if (!resp.ok || !data.success) {
        throw new Error(
            Array.isArray(data.detail)
                ? data.detail.join(", ")
                : data.detail || data.message || "Failed to find recordings"
        );
    }
    return data.recordings;
}

// ─── Activate From Plugin ─────────────────────────────────────────────────────
export interface ActivateFromPluginParams {
    download_url: string;
    meeting_subject: string;
    meeting_date: string;
    meeting_project: string;
    sample_task: string;
}

export async function activateFromPlugin(params: ActivateFromPluginParams): Promise<void> {
    const resp = await fetch(`${CONFIG.CONECTADO_BASE_URL}/api/v1/recordings/activate_from_plugin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    const data = await resp.json();
    if (!resp.ok || !data.success) {
        throw new Error(
            Array.isArray(data.detail)
                ? data.detail.join(", ")
                : data.detail || data.message || "Activation from plugin failed"
        );
    }
}
