"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

import { SkeletonLoader, SubHeading } from "@/components/ui"

import { MovieService } from "@/services/movie/movie.service"

import { getMovieUrl } from "@/config/url.config"

export function PopularMovie() {
	const { data, isLoading } = useQuery({
		queryKey: ["most popular movie in admin"],
		queryFn: async () => MovieService.getMostPopular(),
		select: ({ data }) => data.slice(0, 1).flat()[0]
	})

	return isLoading ? (
		<SkeletonLoader count={1} height={320} className="" />
	) : data ? (
		<section className="air-block flex h-80 items-center justify-center px-8">
			<div className="flex w-full flex-col items-center gap-y-0.5">
				<SubHeading title="The most popular movie" />

				<p className="text-sm text-white/60">Opened {data.countOpened} times</p>

				<Link
					href={getMovieUrl(data.slug)}
					className="group relative mt-2 inline-block h-56 w-full overflow-hidden rounded-lg *:object-cover"
				>
					<Image
						className="transition-transform group-hover:scale-110"
						src={data.poster}
						alt={data.title}
						fill
					/>
				</Link>
			</div>
		</section>
	) : (
		<section className="air-block flex h-80 items-center justify-center">
			<div className="flex flex-col items-center gap-y-0.5">
				<h3 className="text-6xl font-medium text-white">No movies yet</h3>
			</div>
		</section>
	)
}
