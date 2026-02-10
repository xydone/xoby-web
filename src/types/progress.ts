export type ProgressStatus = "in_progress" | "completed" | "pending" | "failed";
export type MediaType = "manga" | "book" | "movie";

export interface ProgressEntry {
	progress_id: string;
	user_id: string;
	media_id: string;
	media_title: string;
	media_type: MediaType;
	status: ProgressStatus;
	progress_value: number;
	// 0.0 to 1.0
	completion_percentage: number;
	progress_unit: string;
	created_at: number;
}
