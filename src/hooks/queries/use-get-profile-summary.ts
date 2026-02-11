import { useQuery } from "@tanstack/react-query";
import { fetchProfileSummary } from "@/api/profile/summary";
import { useUserContext } from "@/app/context";

export const useGetProfileSummary = () => {
	const user = useUserContext();

	return useQuery({
		queryKey: ["profile", "summary", user.accessToken],
		queryFn: fetchProfileSummary,
		enabled: !!user.accessToken,
	});
};
