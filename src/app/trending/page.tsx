import { MoviesCatalog } from "@/components/ui/movies-catalog/MoviesCatalog"

import { getContentType } from "@/services/api/api.helper"

import { API_URL, getMoviesUrl } from "@/config/api.config"

import { IMovie } from "@/shared/types/movie.interface"

async function getMovies() {
	const trendingMoviesRes = await fetch(
		`${API_URL}${getMoviesUrl(`most-popular`)}`,
		{
			method: "GET",
			headers: getContentType()
		}
	)

	if (!trendingMoviesRes.ok) {
		throw new Error("Failed to fetch trending movies")
	}

	const trendingMovies: IMovie[] = await trendingMoviesRes.json()

	return trendingMovies
}

export default async function TrendingMoviesPage() {
	const movies = await getMovies()

	return (
		<MoviesCatalog
			title="Trending movies"
			movies={movies || []}
			description="Watch the most popular movies and series in excellent quality: legal, safe, without ads"
		/>
	)
}
