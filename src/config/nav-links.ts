import type { NavItem } from "../types/nav";

export interface NavLinksConfig {
	nav: NavItem[];
}

export const navLinksConfig: NavLinksConfig = {
	nav: [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Profile",
			href: "/",
		},
		{
			title: "Lists",
			href: "/",
		},
		{
			title: "Browse",
			href: "/",
		},
	],
};
