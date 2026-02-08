import type { Metadata } from "next";
import "./styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import MainNav from "../components/ui/main-nav";
import MobileNav from "../components/ui/mobile-nav";
import { Providers } from "./providers";
export const metadata: Metadata = {
	title: "Xoby Web",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					<MainNav className="pb-3 pt-3 px-5 bg-primary" />
					<MobileNav className="mb-5 mt-3 mx-5 bg-primary" />
					<div className="m-3">{children}</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
