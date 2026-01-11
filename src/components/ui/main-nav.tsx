"use client";
import { ChevronDown, CircleUser, LogIn, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useUserContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { navLinksConfig } from "@/config/nav-links";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { ProfileMenu, SignInForm, SignUpForm } from "./nav-common";

export default function MainNav({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	const [isSignInOpen, setIsSignInOpen] = useState(false);
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	return (
		<nav
			className={cn("green hidden md:flex flex-row items-center", className)}
		>
			<div className="flex-1" />
			<div className="flex flex-1 justify-center items-center gap-5">
				{navLinksConfig.nav.map((item, index) => {
					if (!item.popover) {
						return (
							<Button variant="ghost" key={index} asChild>
								<Link href={`${item.href}`}>{item.title}</Link>
							</Button>
						);
					}
					return (
						<Popover key={index}>
							<PopoverTrigger asChild>
								<Button variant="ghost">
									{item.title}
									<ChevronDown />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full flex flex-col">
								{item.popover.map((popoverItem, index) => (
									<div key={index}>
										<Link href={`${popoverItem.href}`}>
											{popoverItem.title}
										</Link>
										{item.popover && index !== item.popover.length - 1 && (
											<Separator className="my-2" />
										)}
									</div>
								))}
							</PopoverContent>
						</Popover>
					);
				})}
			</div>
			<div className="flex flex-1 justify-end">
				<div className="flex flex-row gap-5">
					{mounted && theme === "dark" ? (
						<Button variant="nav" onClick={() => setTheme("light")}>
							<Sun />
						</Button>
					) : (
						<Button variant="nav" onClick={() => setTheme("dark")}>
							<Moon />
						</Button>
					)}

					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button variant="nav">
								<User />
							</Button>
						</DropdownMenuTrigger>
						{mounted && (
							<MenuManager
								setIsSignInOpen={setIsSignInOpen}
								setIsSignUpOpen={setIsSignUpOpen}
							/>
						)}
					</DropdownMenu>

					<Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Register</DialogTitle>
							</DialogHeader>
							<SignUpForm setOpen={setIsSignUpOpen} />
						</DialogContent>
					</Dialog>
					<Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Sign in</DialogTitle>
							</DialogHeader>
							<SignInForm setOpen={setIsSignInOpen} />
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</nav>
	);
}

function MenuManager({
	setIsSignInOpen,
	setIsSignUpOpen,
}: {
	setIsSignUpOpen: Dispatch<SetStateAction<boolean>>;
	setIsSignInOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const user = useUserContext();

	if (user.isSignedIn) return <ProfileMenu user={user} />;
	return (
		<DropdownMenuContent>
			<DropdownMenuItem onClick={() => setIsSignInOpen(true)}>
				<CircleUser />
				Sign in
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => setIsSignUpOpen(true)}>
				<LogIn />
				Register
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
}
