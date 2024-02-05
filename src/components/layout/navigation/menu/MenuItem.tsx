"use client"

import clsx from "clsx"
import Link from "next/link"

import { MaterialIcon } from "@/components/ui"

import { useActivePathname } from "@/hooks/useActivePathname"

import { IMenuItem } from "./menu.interface"

export function MenuItem({ item: { title, slug, icon } }: { item: IMenuItem }) {
	const isActive = useActivePathname(slug)

	return (
		<li
			className={clsx("border-r-4 transition-colors", {
				"border-r-primary": isActive,
				"border-r-transparent": !isActive
			})}
		>
			<Link
				className="group flex items-center gap-3 text-gray-600"
				href={slug}
				// prefetch={false}
			>
				<MaterialIcon
					className={clsx(
						"text-2lg transition-colors group-hover:text-primary",
						{
							"text-white": isActive
						}
					)}
					name={icon}
				/>

				<span
					className={clsx("text-lg transition-colors group-hover:text-white", {
						"text-white": isActive
					})}
				>
					{title}
				</span>
			</Link>
		</li>
	)
}
