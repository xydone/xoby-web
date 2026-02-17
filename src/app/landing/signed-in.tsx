import { ActivityCard } from "@/components/dashboard/activitycard";
import { RecentLogged } from "@/components/dashboard/recentlogged";
import { StatsOverview } from "@/components/dashboard/statsoverviewcard";

export default function SignedIn() {
	const activities = Array.from({ length: 8 }).map((_, index) => ({
		id: index,
		username: `User ${index + 1}`,
		title: `Example Title ${index + 1}`,
		createdAt: "2h ago",
	}));
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

			<footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t py-4 overflow-hidden">
				<div className="relative flex">
					<div className="flex flex-row gap-4 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
						{activities.map((activity) => (
							<div key={`set1-${activity.id}`} className="w-[300px] shrink-0">
								<ActivityCard {...activity} />
							</div>
						))}
						{activities.map((activity) => (
							<div key={`set2-${activity.id}`} className="w-[300px] shrink-0">
								<ActivityCard {...activity} />
							</div>
						))}
					</div>
				</div>
			</footer>
		</main>
	);
}
