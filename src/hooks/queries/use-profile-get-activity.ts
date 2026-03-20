import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "@/api/profile/activity";
import { useUserContext } from "@/app/context";

export const useGetActivity = () => {
	const user = useUserContext();
	return useQuery({
		queryKey: ["profile", "activity", user.accessToken],
		queryFn: fetchActivity,
		enabled: !!user.accessToken,
	});
};
