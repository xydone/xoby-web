import type { MediaType, ProgressStatus, ProgressUnit } from "./progress";

export type ImageType = "backdrop" | "logo" | "poster" | "cover";

export interface ProfileSummary {
	movies_completed: number;
	books_completed: number;
	manga_completed: number;
	hours_watched: number;
	pages_read: number;
	average_rating: number;
	ratings: number[];
	longest_streak: number;
	current_streak: number;
}

export type ActivityData =
	| {
			type: "progress";
			status: ProgressStatus;
			progress_value: number;
			progress_unit: ProgressUnit;
	  }
	| {
			type: "rating";
			score: number;
	  }
	| {
			type: "review";
			title: string | null;
			content: string;
			is_spoiler: boolean;
	  };

export interface ActivityEntry {
	id: string;
	user_id: string;
	created_at: number;
	media_id: string | null;
	season_id: string | null;
	episode_id: string | null;
	media_title: string;
	media_type: MediaType;
	image_path: string | null;
	image_type: ImageType | null;
	data: ActivityData;
}
