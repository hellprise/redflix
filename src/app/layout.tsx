import clsx from "clsx"
import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"

import LayoutClient from "@/components/layout/Layout"

import "@/assets/styles/globals.scss"

const outfit = Outfit({ subsets: ["latin"] })

export const viewport: Viewport = {
	themeColor: "#181b1e",
	colorScheme: "dark",
	initialScale: 1,
	width: "device-width",
	height: "device-height"
}

export const metadata: Metadata = {
	title: "Movie Streaming Web App",
	description:
		"Movie Streaming Web App built with Next.js, TailwindCSS and TypeScript",
	icons: "/icon.svg",
	// robots: {
	// 	follow: false,
	// 	index: false
	// },
	twitter: {
		images: [
			{
				url: "https://nextjs.org/og.png", // Must be an absolute URL
				width: 800,
				height: 600
			},
			{
				url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
				width: 1800,
				height: 1600,
				alt: "My custom alt"
			}
		],
		title: "Movie Streaming Web App",
		description:
			"Movie Streaming Web App built with Next.js, TailwindCSS and TypeScript"
	},
	openGraph: {
		type: "website",
		url: "https://nextjs.org",
		title: "Movie Streaming Web App",
		description:
			"Movie Streaming Web App built with Next.js, TailwindCSS and TypeScript",
		siteName: "Movie Streaming",
		images: [
			{
				url: "https://nextjs.org/og.png", // Must be an absolute URL
				width: 800,
				height: 600
			},
			{
				url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
				width: 1800,
				height: 1600,
				alt: "My custom alt"
			}
		],
		locale: "en_US"
	}
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={clsx(outfit.className)}>
				<LayoutClient>{children}</LayoutClient>
			</body>
		</html>
	)
}
