import { Clock, Eye, Star, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfileSummary } from "@/hooks/queries/use-get-profile-summary";

export function StatsOverview() {
	const { data: summary, isLoading, error } = useGetProfileSummary();

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className="h-32 w-full" />
				))}
			</div>
		);
	}

	if (error || !summary) return null;

	const totalItems =
		summary.movies_completed +
		summary.books_completed +
		summary.manga_completed;

	const stats = [
		{
			label: "Total Completed",
			value: totalItems.toString(),
			icon: Eye,
		},
		{
			label: "Current Streak",
			value: `${summary.current_streak} Days`,
			icon: Trophy,
		},
		{
			label: "Hours Spent",
			value: summary.hours_watched.toFixed(1),
			icon: Clock,
		},
		{
			label: "Average Rating",
			value: summary.average_rating.toFixed(1),
			icon: Star,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
			{stats.map((stat) => (
				<Card key={stat.label}>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
						<stat.icon className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stat.value}</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
