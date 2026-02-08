import { BookUser, Clock } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const items = [
	{
		title: "Title 1",
		author: "Name 1",
		progress: 80,
		lastRead: "2h ago",
	},
	{
		title: "Title 2",
		author: "Name 2",
		progress: 20,
		lastRead: "1d ago",
	},
	{
		title: "Title 3",
		author: "Name 3",
		progress: 50,
		lastRead: "3d ago",
	},
];

export function RecentLogged() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{items.map((item) => (
				<Card
					key={item.title}
					className="flex flex-col transition-all hover:shadow-md"
				>
					<CardHeader className="space-y-1">
						<div className="flex items-start justify-between gap-2">
							<CardTitle className="text-lg leading-tight">
								{item.title}
							</CardTitle>
						</div>
						<div className="flex items-center text-sm text-muted-foreground">
							<BookUser className="mr-1 h-3 w-3" />
							{item.author}
						</div>
					</CardHeader>

					<CardContent className="flex-grow">
						<div className="space-y-2">
							<div className="flex justify-between text-xs font-medium">
								<span>Progress</span>
								<span>{item.progress}%</span>
							</div>
							<Progress value={item.progress} className="h-2" />
						</div>
					</CardContent>

					<CardFooter className="pt-0">
						<div className="flex items-center text-xs text-muted-foreground">
							<Clock className="mr-1 h-3 w-3" />
							Last read {item.lastRead}
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
