import { useQuery } from "@tanstack/react-query";
import { fetchInProgressMedia } from "@/api/profile/progress";
import { useUserContext } from "@/app/context";

export const useGetInProgressMedia = () => {
	const user = useUserContext();

	return useQuery({
		queryKey: ["profile", "in-progress", user.accessToken],
		queryFn: fetchInProgressMedia,
		enabled: !!user.accessToken,
	});
};
