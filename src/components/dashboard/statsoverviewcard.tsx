import { BookOpen, Clock, Star, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
	{ label: "Total", value: "123", icon: BookOpen },
	{ label: "Streaks", value: "123 Days", icon: Trophy },
	{ label: "Hours Spent", value: "123", icon: Clock },
	{ label: "Average Rating", value: "1.2", icon: Star },
];

export function StatsOverview() {
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
