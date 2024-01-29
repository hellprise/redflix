"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { Heading, SkeletonLoader, SubHeading } from "@/components/ui"
import { Gallery } from "@/components/ui/gallery/Gallery"
import { Slider } from "@/components/ui/slider/Slider"

import { ActorService } from "@/services/actor/actor.service"
import { MovieService } from "@/services/movie/movie.service"

import { API_URL, getMoviesUrl } from "@/config/api.config"
import { getActorUrl, getMovieUrl } from "@/config/url.config"

import { getGenresList } from "@/utils/getGenreListEach"
import { toastError } from "@/utils/toast-error"

export function Home() {
	const { data: movies, isLoading: isMoviesLoading } = useQuery({
		queryKey: ["movies list"],
		queryFn: () => MovieService.getAll(),
		select: ({ data }) => data.slice(0, 3)
	})

	const { data: trendingMovies, isLoading: isTrendingLoading } = useQuery({
		queryKey: ["trending movies list"],
		queryFn: () => MovieService.getMostPopular(),
		select: ({ data }) => data.slice(0, 7)
	})

	const { data: actors, isLoading: isActorsLoading } = useQuery({
		queryKey: ["actors list"],
		queryFn: () => ActorService.getAll(),
		select: ({ data }) => data.slice(0, 7)
	})

	const {
		data: testData,
		isError,
		error
	} = useQuery({
		queryKey: ["test"],
		// queryFn: () => MovieService.getByGenres(["6225b0394bc3c876b7b3bec5"])
		queryFn: async () => {
			const moviesByGenreRes = await fetch(
				`${API_URL}${getMoviesUrl(`by-genres`)}`,
				{
					method: "POST",
					body: JSON.stringify({
						genreIds: ["6225b0394bc3c876b7b3bec5"]
					}),
					headers: {
						"Content-Type": "application/json"
					}
				}
			)

			return moviesByGenreRes.json()
		}
	})

	useEffect(() => {
		if (isError) toastError(error, "Failed to test")
	}, [isError, error])

	console.log("testData", testData)

	return (
		<section className="md:space-y-5">
			<Heading
				className="text-xl tracking-wider text-gray-300"
				title="Watch movies online"
			/>

			{isMoviesLoading ? (
				<SkeletonLoader count={1} />
			) : (
				movies &&
				movies.length && (
					<Slider
						slides={movies.map(movie => ({
							_id: movie._id,
							slug: getMovieUrl(movie.slug),
							bigPoster: movie.bigPoster,
							subtitle: getGenresList(movie.genres),
							title: movie.title
						}))}
					/>
				)
			)}

			<div className="space-y-3">
				<SubHeading title="Trending Movies" className="text-gray-300" />

				{isTrendingLoading ? (
					<SkeletonLoader count={1} />
				) : (
					trendingMovies &&
					trendingMovies.length && (
						<Gallery
							data={trendingMovies.map(movie => ({
								name: movie.title,
								slug: getMovieUrl(movie.slug),
								posterPath: movie.poster
							}))}
						/>
					)
				)}
			</div>

			<div className="space-y-3">
				<SubHeading title="Best Actors" className="text-gray-300" />

				{isActorsLoading ? (
					<SkeletonLoader count={1} />
				) : (
					actors &&
					actors.length && (
						<Gallery
							data={actors.map(actor => ({
								name: actor.name,
								posterPath: actor.photo,
								slug: getActorUrl(actor.slug),
								content: {
									title: actor.name,
									subtitle: `+${actor.countMovies} movies`
								}
							}))}
						/>
					)
				)}
			</div>
		</section>
	)
}
