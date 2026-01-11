"use client";
import NotSignedIn from "@/app/landing/not-signed-in";
import SignedIn from "@/app/landing/signed-in";
import { useUserContext } from "./context";
import Loading from "./loading";
export default function Root() {
	const user = useUserContext();
	if (user.isSignedIn == null) return <Loading />;
	return user.isSignedIn ? <SignedIn /> : <NotSignedIn />;
}
