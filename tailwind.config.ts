import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				text: {
					DEFAULT: "var(--text-color)",
					muted: "var(--muted-text-color)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					strong: "var(--accent-strong)",
					foreground: "var(--accent-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				border: "var(--border)",
				input: "var(--input)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
		keyframes: {
			subtlePulse: {
				"0%, 100%": { filter: "brightness(1)" },
				"50%": { filter: "brightness(1.4)" },
			},

			marquee: {
				"0%": { transform: "translateX(0%)" },
				"100%": { transform: "translateX(-50%)" },
			},
		},
		animation: {
			subtlePulse: "subtlePulse 1.5s linear infinite",
			marquee: "marquee 30s linear infinite",
		},
	},
	plugins: [],
} satisfies Config;
