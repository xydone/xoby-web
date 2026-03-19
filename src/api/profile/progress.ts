import { axiosInstance } from "@/lib/api";
import type { ProgressEntry, ProgressStatus } from "@/types/progress";

export const fetchMediaByStatus = async (
	status: ProgressStatus,
): Promise<ProgressEntry[]> => {
	const response = await axiosInstance.get(
		`${process.env.NEXT_PUBLIC_API_URL}/v1/profile/progress`,
		{ params: { status } },
	);
	return response.data;
};
