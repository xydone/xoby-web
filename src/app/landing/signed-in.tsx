import { formatDistanceToNow } from "date-fns";
import { ActivityCard } from "@/components/dashboard/activitycard";
import { RecentLogged } from "@/components/dashboard/recentlogged";
import { StatsOverview } from "@/components/dashboard/statsoverviewcard";
import { useGetActivity } from "@/hooks/queries/use-profile-get-activity";
import type { ActivityData } from "@/types/profile";

export default function SignedIn() {
	const { data: activities = [], isLoading } = useGetActivity();

	return (
		<main className="relative flex flex-col min-h-screen w-full bg-background">
			<section className="flex-1 p-6 md:p-10 space-y-8 pb-32">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
					</div>
				</div>

				<StatsOverview />

				<div className="grid grid-cols-1 gap-8">
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">In Progress</h3>
						<RecentLogged />
					</div>
				</div>
			</section>

			<footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border border-text-200 py-4 overflow-hidden">
				<div className="relative flex">
					<div className="flex flex-row gap-4 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
						{isLoading ? (
							<div className="px-6 text-sm text-muted-foreground">
								Loading activity...
							</div>
						) : (
							<div className="flex flex-row gap-4 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
								{[...activities, ...activities].map((activity, i) => (
									<div
										key={`${activity.id}-${i}`}
										className="w-[300px] shrink-0"
									>
										<ActivityCard
											username={activity.user_display_name}
											title={activity.media_title}
											createdAt={formatDistanceToNow(
												new Date(activity.created_at / 1000),
												{ addSuffix: true },
											)}
											summary={getActivitySummary(activity.data)}
											coverUrl={activity.image_url ?? undefined}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</footer>
		</main>
	);
}

function getActivitySummary(data: ActivityData): string {
	if ("progress" in data) {
		const { status, progress_value, progress_unit } = data.progress;
		if (status === "completed") return "Completed";
		if (status === "planned") return "Planned";
		if (progress_unit === "percentage")
			return `${progress_value * 100}% — ${status}`;
		return `${progress_value} — ${status}`;
	}
	if ("rating" in data) return `Rated ${data.rating.score}`;
	if ("review" in data) return data.review.title ?? "Untitled review";
	throw new Error(`Unknown activity data: ${JSON.stringify(data)}`);
}
