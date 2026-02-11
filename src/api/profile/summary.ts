import { axiosInstance } from "@/lib/api";
import type { ProfileSummary } from "@/types/profile";

export const fetchProfileSummary = async (): Promise<ProfileSummary> => {
	const response = await axiosInstance.get(
		`${process.env.NEXT_PUBLIC_API_URL}/profile/summary`,
	);
	return response.data;
};
