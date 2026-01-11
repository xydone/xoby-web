import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosError } from "axios";
import { Goal, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleSignOut, type User, useUserContext } from "@/app/context";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useSignIn, useSignOut, useSignUp } from "@/lib/services/auth";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";

export const SignInFormSchema = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
});

export const SignUpFormSchema = z.object({
	display_name: z.string().nonempty(),
	username: z.string().nonempty(),
	password: z.string().nonempty(),
});

export enum SignInStatus {
	successful = 0,
	rejected = 1,
	serverError = 2,
}

export enum SignUpStatus {
	successful = 0,
	rejected = 1,
	serverError = 2,
}

export function SignInForm({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const user = useUserContext();
	const form = useForm<z.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema),
	});
	const [showPassword, setShowPassword] = useState(false);
	const [signInStatus, setSignInStatus] = useState<SignInStatus | undefined>(
		undefined,
	);
	const { mutateAsync: signIn } = useSignIn();
	function onSubmit(data: z.infer<typeof SignInFormSchema>) {
		signIn(
			{
				username: data.username,
				password: data.password,
			},
			{
				onSuccess: (response) => {
					const { access_token, refresh_token } = response;

					localStorage.setItem("accessToken", access_token);
					localStorage.setItem("refreshToken", refresh_token);
					setOpen(false);
					user.setAccessToken(access_token);
					user.setRefreshToken(refresh_token);
					user.setIsSignedIn(true);
				},
				onError: (error: any) => {
					if (error.status === 401) {
						setSignInStatus(SignInStatus.rejected);
					} else {
						setSignInStatus(SignInStatus.serverError);
					}
				},
			},
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-5"
			>
				<FormField
					control={form.control}
					name={"username"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input onChange={field.onChange} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"password"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									onChange={field.onChange}
									type={showPassword ? "text" : "password"}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-3">
					<Checkbox
						className="place-self-center"
						checked={showPassword}
						onCheckedChange={() => setShowPassword(!showPassword)}
					/>
					<div>
						<label>Show password</label>
					</div>
				</div>
				<Button
					type="submit"
					variant={"outline"}
					className={"w-full place-self-center"}
				>
					Submit
				</Button>
				{signInStatus === SignInStatus.rejected && (
					<ErrorMessage>
						Sign in failed! Check your credentials and try again.
					</ErrorMessage>
				)}

				{signInStatus === SignInStatus.serverError && (
					<ErrorMessage>
						A server error occurred while signing in. Please try again later!
					</ErrorMessage>
				)}
			</form>
		</Form>
	);
}
export function SignUpForm({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
	});
	const [showPassword, setShowPassword] = useState(false);
	const [signUpStatus, setSignUpStatus] = useState<SignUpStatus | undefined>(
		undefined,
	);
	const signUpMutation = useSignUp();
	function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
		signUpMutation.mutate(
			{
				display_name: data.display_name,
				username: data.username,
				password: data.password,
			},
			{
				onSuccess: () => {
					setOpen(false);
				},
				onError: (error: any) => {
					if (error.status === 401) {
						setSignUpStatus(SignUpStatus.rejected);
					} else {
						setSignUpStatus(SignUpStatus.serverError);
					}
				},
			},
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				<FormField
					control={form.control}
					name={"display_name"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Display name</FormLabel>
							<FormControl>
								<Input onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name={"username"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input onChange={field.onChange} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"password"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									onChange={field.onChange}
									type={showPassword ? "text" : "password"}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-3">
					<Checkbox
						className="place-self-center"
						checked={showPassword}
						onCheckedChange={() => setShowPassword(!showPassword)}
					/>
					<div>
						<label>Show password</label>
					</div>
				</div>
				<Button
					type="submit"
					variant={"outline"}
					className={"place-self-center"}
				>
					Submit
				</Button>
				{signUpStatus === SignUpStatus.rejected && (
					<ErrorMessage>Username already exists!</ErrorMessage>
				)}

				{signUpStatus === SignUpStatus.serverError && (
					<ErrorMessage>
						A server error occurred while signing up. Please try again later!
					</ErrorMessage>
				)}
			</form>
		</Form>
	);
}

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
	<p className="text-destructive text-center">{children}</p>
);

export function ProfileMenu({
	className,
	user,
}: {
	className?: string;
	user: User;
}) {
	const { mutateAsync: signOutMutation } = useSignOut();
	const signOut = () => {
		handleSignOut(user);
		signOutMutation();
	};
	return (
		<DropdownMenuContent className={cn("sm:max-w-[425px]", className)}>
			<DropdownMenuLabel className="max-w-52 truncate overflow-hidden whitespace-nowrap">
				Profile
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>
				<Goal />
				Goals
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<Link className="inherit" href="/settings">
					<Settings />
					Settings
				</Link>
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem onClick={signOut}>
				<LogOut />
				Log out
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
}
