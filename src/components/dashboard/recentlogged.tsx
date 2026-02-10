import { formatDistanceToNow } from "date-fns";
import { BookOpen, Clock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInProgressMedia } from "@/hooks/queries/use-profile-in-progress";

export function RecentLogged() {
	const { data, isLoading } = useGetInProgressMedia();

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-[180px] w-full rounded-xl" />
				))}
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 border border-dashed rounded-lg bg-muted/10">
				<p className="text-sm text-muted-foreground">
					No media currently in progress.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{data.map((item) => {
				const percentage = Math.round(item.completion_percentage * 100);

				return (
					<Card
						key={item.progress_id}
						className="flex flex-col transition-all hover:shadow-md"
					>
						<CardHeader className="space-y-1">
							<div className="flex items-start justify-between gap-2">
								<CardTitle className="text-lg leading-tight line-clamp-1">
									{item.media_title}
								</CardTitle>
								<Badge variant="outline" className="capitalize text-[10px]">
									{item.media_type}
								</Badge>
							</div>
						</CardHeader>

						<CardContent className="flex-grow">
							<div className="space-y-2">
								<div className="flex justify-between text-xs font-medium">
									<span>Completion</span>
									<span>{percentage}%</span>
								</div>
								<Progress value={percentage} className="h-2" />
							</div>
						</CardContent>

						<CardFooter className="pt-0">
							<div className="flex items-center text-xs text-muted-foreground">
								<Clock className="mr-1 h-3 w-3" />
								Updated{" "}
								{formatDistanceToNow(new Date(item.created_at / 1000), {
									addSuffix: true,
								})}
							</div>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
}
