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
	title?: string;
	coverUrl?: string;
	createdAt: string;
	summary: string;
}

export function ActivityCard({
	username,
	title,
	coverUrl,
	createdAt,
	summary,
}: ActivityProps) {
	return (
		<div>
			<Card className="py-0 flex flex-row w-full overflow-hidden h-24">
				<div className="w-1/4 shrink-0 relative bg-muted">
					{coverUrl ? (
						<Image
							src={coverUrl}
							alt={"Cover Image"}
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
						<CardDescription className="text-[10px]">
							{createdAt}
						</CardDescription>
					</CardHeader>
					<CardContent className="p-3 pt-1">
						<p className="text-xs text-muted-foreground">
							<span className="block truncate">{username}</span>
							<span className="block text-[11px] leading-tight line-clamp-2">
								{summary}
							</span>
						</p>
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
