import React from "react"

import { AdminNavigation } from "@/components/screens"

export default function AdminLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section>
			{/*<AdminNavigation />*/}

			<main>{children}</main>
		</section>
	)
}
