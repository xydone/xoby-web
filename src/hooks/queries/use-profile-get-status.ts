import { useQuery } from "@tanstack/react-query";
import { fetchMediaByStatus } from "@/api/profile/progress";
import { useUserContext } from "@/app/context";
import type { ProgressStatus } from "@/types/progress";

export const useGetMediaByStatus = (status: ProgressStatus) => {
	const user = useUserContext();
	return useQuery({
		queryKey: ["profile", "progress", status, user.accessToken],
		queryFn: () => fetchMediaByStatus(status),
		enabled: !!user.accessToken,
	});
};
