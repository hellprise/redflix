import { MoviesCatalog } from "@/components/ui/movies-catalog/MoviesCatalog"

import { getContentType } from "@/services/api/api.helper"

import { API_URL, getMoviesUrl } from "@/config/api.config"

import { IMovie } from "@/shared/types/movie.interface"

async function getMovies() {
	const moviesRes = await fetch(`${API_URL}${getMoviesUrl("")}`, {
		method: "GET",
		headers: getContentType()
	})

	if (!moviesRes.ok) {
		throw new Error("Failed to fetch movies")
	}

	const trendingMovies: IMovie[] = await moviesRes.json()

	return trendingMovies
}

export default async function FreshMoviesPage() {
	const movies = await getMovies()

	return (
		<MoviesCatalog
			title="Fresh movies"
			movies={movies || []}
			description="New movies and series in excellent quality: legal, safe, without ads"
		/>
	)
}
