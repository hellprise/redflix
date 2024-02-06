import { Home } from "@/components/screens"

import { getContentType } from "@/services/api/api.helper"

import { API_URL, getActorsUrl, getMoviesUrl } from "@/config/api.config"

import { IMovie } from "@/shared/types/movie.interface"

async function getData() {
	const moviesRes = await fetch(`${API_URL}${getMoviesUrl("")}`, {
		method: "GET",
		headers: getContentType()
	})
	const trendingMoviesRes = await fetch(
		`${API_URL}${getMoviesUrl(`most-popular`)}`,
		{
			method: "GET",
			headers: getContentType()
		}
	)
	const actorsRes = await fetch(`${API_URL}${getActorsUrl("")}`, {
		method: "GET",
		headers: getContentType()
	})

	if (!moviesRes.ok) {
		throw new Error("Failed to fetch movies")
	}

	if (!trendingMoviesRes.ok) {
		throw new Error("Failed to fetch trending movies")
	}

	if (!actorsRes.ok) {
		throw new Error("Failed to fetch actors")
	}

	const movies: IMovie[] = await moviesRes.json()
	const trendingMovies: IMovie[] = await trendingMoviesRes.json()
	const actors = await actorsRes.json()

	return {
		movies: movies.slice(0, 3),
		trendingMovies: trendingMovies.slice(0, 7),
		actors: actors.slice(0, 7)
	}
}

export default async function Homepage() {
	const data = await getData()

	return <Home {...data} />
}
