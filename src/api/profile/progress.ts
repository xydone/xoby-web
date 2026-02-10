import { axiosInstance } from "@/lib/api";
import type { ProgressEntry } from "@/types/progress";

export const fetchInProgressMedia = async (): Promise<ProgressEntry[]> => {
	const response = await axiosInstance.get(
		`${process.env.NEXT_PUBLIC_API_URL}/profile/progress/in-progress`,
	);
	return response.data;
};
