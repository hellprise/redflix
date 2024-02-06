"use client"

import { PropsWithChildren } from "react"

import { Navigation } from "@/components/layout/navigation/Navigation"

import { MainProvider } from "@/providers/MainProvider"

// import { Toaster } from 'react-hot-toast'
import { Sidebar } from "./sidebar/Sidebar"

export default function LayoutClient({ children }: PropsWithChildren<unknown>) {
	return (
		<MainProvider>
			<Navigation />
			<main className="my-0 ml-[20%] mr-[23%] min-h-screen p-11">
				{children}
			</main>
			<Sidebar />
			{/*<Toaster position="top-right" />*/}
		</MainProvider>
	)
}
