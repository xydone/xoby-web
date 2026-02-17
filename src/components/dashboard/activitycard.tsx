import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ActivityProps {
	username: string;
	title: string;
	coverUrl?: string;
	createdAt: string;
}

export function ActivityCard({
	username,
	title,
	coverUrl,
	createdAt,
}: ActivityProps) {
	const time = createdAt;
	return (
		<div>
			<Card className="py-0 flex flex-row w-full overflow-hidden h-24">
				<div className="w-1/4 shrink-0 relative bg-muted">
					{coverUrl ? (
						<Image
							src={coverUrl}
							alt={title}
							fill
							className="object-cover"
							sizes="80px"
						/>
					) : (
						<div className="flex items-center justify-center h-full text-[10px] text-muted-foreground">
							No Image
						</div>
					)}
				</div>
				<div className="w-3/4 flex flex-col justify-center">
					<CardHeader className="p-3 pb-0">
						<CardTitle className="text-sm truncate">{title}</CardTitle>
						<CardDescription className="text-[10px]">{time}</CardDescription>
					</CardHeader>

					<CardContent className="p-3 pt-1">
						<p className="text-xs text-muted-foreground truncate">
							{`${username} read chapter 1`}
						</p>
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
