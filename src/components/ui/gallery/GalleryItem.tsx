"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

import st from "./Gallery.module.scss"
import { IGalleryItemProps } from "./gallery.interface"

export function GalleryItem({ item, variant }: IGalleryItemProps) {
	return (
		<Link
			className={clsx(
				"relative flex flex-[0_0_auto] animate-fade items-end overflow-hidden rounded-lg shadow-lg transition-transform hover:-translate-y-1",
				{
					"mr-4 h-72 w-1/5 max-w-[200px] last:mr-0": variant === "vertical",
					"mb-8 h-44 w-[30%]": variant === "horizontal",
					[st.withText]: item.content
				}
			)}
			href={item.slug}
		>
			{item.posterPath ? (
				<Image
					className="image-like-bg"
					src={item.posterPath}
					alt={item.name}
					fill
					priority
					quality={40}
				/>
			) : (
				<div className="absolute inset-0 rounded-lg bg-gray-900" />
			)}

			{item.content && (
				<div className="st.content relative z-2 m-3 w-full text-center">
					<h4 className="st.title mb-1 font-semibold text-white text-shadow">
						{item.content.title}
					</h4>
					<p className="st.subtitle text-gray-500 text-shadow">
						{item.content.subtitle}
					</p>
				</div>
			)}
		</Link>
	)
}
