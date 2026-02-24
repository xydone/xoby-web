import { useState } from "react";
import { SignInForm } from "@/components/nav/nav-common";
import { Button } from "@/components/ui/button";
export default function SignedIn() {
	const [isSignInOpen, setIsSignInOpen] = useState(false);
	return (
		<div className="flex flex-col gap-5 my-5 w-1/4 mx-auto items-center">
			<h1 className="text-2xl">Please sign in</h1>
			<SignInForm setOpen={setIsSignInOpen} />

			<Button variant="outline" className="w-full">
				Register
			</Button>
		</div>
	);
}
