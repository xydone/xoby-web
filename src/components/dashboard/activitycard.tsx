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
	// TODO: parse it into a time ago format
	const time = createdAt;
	return (
		<div>
			<Card className="py-0 flex flex-row w-full max-w-md overflow-hidden">
				<div className="w-1/4 shrink-0 relative bg-muted">
					{coverUrl ? (
						<Image
							src={coverUrl}
							alt={`${title} cover art`}
							fill
							className="object-cover"
							sizes="100px"
						/>
					) : (
						<div className="flex items-center justify-center h-full text-xs text-muted-foreground">
							No Image
						</div>
					)}
				</div>
				<div className="w-3/4 flex flex-col">
					<CardHeader className="p-4 pb-2">
						<CardTitle className="text-base">{title}</CardTitle>
						<CardDescription className="text-xs">{time}</CardDescription>
					</CardHeader>

					<CardContent className="p-4 pt-0 flex-grow">
						<p className="text-sm text-muted-foreground">
							{`${username} read chapter 1`}
						</p>
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
