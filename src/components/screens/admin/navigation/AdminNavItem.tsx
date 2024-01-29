"use client"

import clsx from "clsx"
import Link from "next/link"

import { useActivePathname } from "@/hooks/useActivePathname"

import { INavigationItem } from "./admin-navigation.interface"

interface IAdminNavItem {
	item: INavigationItem
}

export function AdminNavItem({ item: { title, slug } }: IAdminNavItem) {
	const isActive = useActivePathname(slug)

	return (
		<li
			className={clsx(
				"animate-scaleIn border-b-2 px-4 pb-3 font-normal tracking-wider transition-colors hover:text-white",
				{
					"border-b-primary text-white": isActive,
					"border-b-transparent text-gray-500": !isActive
				}
			)}
		>
			<Link href={slug}>{title}</Link>
		</li>
	)
}
