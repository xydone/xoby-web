import { axiosInstance } from "@/lib/api";
import type { ActivityEntry } from "@/types/profile";

export const fetchActivity = async (): Promise<ActivityEntry[]> => {
	const response = await axiosInstance.get(
		`${process.env.NEXT_PUBLIC_API_URL}/v1/profile/activity`,
	);
	return response.data.items;
};
