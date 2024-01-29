"use client"

import { Menu } from "@/components/layout"
import { SkeletonLoader } from "@/components/ui"

import { usePopularGenres } from "./usePopularGenres"

export function GenreMenu() {
	const { genres, isLoading } = usePopularGenres()

	return isLoading ? (
		<section className="pr-11">
			<SkeletonLoader count={5} className="mb-6 h-7" />
		</section>
	) : genres && genres.length ? (
		<Menu menu={{ title: "Popular Genres", items: genres }} />
	) : (
		<div>no genres</div>
	)
}
