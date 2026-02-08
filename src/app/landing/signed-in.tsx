import { ActivityCard } from "@/components/dashboard/activitycard";
import { RecentLogged } from "@/components/dashboard/recentlogged";
import { StatsOverview } from "@/components/dashboard/statsoverviewcard";

export default function SignedIn() {
	return (
		<main className="flex min-h-screen w-full bg-background">
			<aside className="hidden lg:flex flex-col w-1/4 p-6 border-r overflow-y-auto h-screen sticky top-0">
				<h2 className="text-xl font-bold mb-6">Activity</h2>
				<div className="flex flex-col gap-4">
					{Array.from({ length: 8 }).map((_, index) => (
						<ActivityCard
							key={index}
							username={`User ${index + 1}`}
							title={`Example Title ${index + 1}`}
							createdAt="2h ago"
						/>
					))}
				</div>
			</aside>

			<section className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
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
		</main>
	);
}
