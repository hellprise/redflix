import { SingleMovie } from "@/components/screens/movie/SingleMovie"
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface"

import { getContentType } from "@/services/api/api.helper"

import { API_URL, getMoviesUrl } from "@/config/api.config"
import { getMovieUrl } from "@/config/url.config"

import { IMovie } from "@/shared/types/movie.interface"

async function getMovies({ slug }: { slug: string }) {
	const movieRes = await fetch(`${API_URL}${getMoviesUrl(`by-slug/${slug}`)}`)

	if (!movieRes.ok) {
		throw new Error("Failed to fetch movie")
	}

	const movie: IMovie = await movieRes.json()

	const similarMoviesRes = await fetch(
		`${API_URL}${getMoviesUrl(`by-genres`)}`,
		{
			method: "POST",
			body: JSON.stringify({
				genreIds: movie.genres.map(genre => genre._id)
			}),
			headers: getContentType()
		}
	)

	if (!similarMoviesRes.ok) {
		throw new Error("Failed to fetch movies by current movie genres")
	}

	const similarMoviesData: IMovie[] = await similarMoviesRes.json()

	const similarMovies: IGalleryItem[] = similarMoviesData
		.filter(m => m._id !== movie._id)
		.map(movie => ({
			name: movie.title,
			slug: getMovieUrl(movie.slug),
			posterPath: movie.poster
		}))

	return {
		movie,
		similarMovies
	}
}

export async function generateStaticParams() {
	const movies: IMovie[] = await fetch(`${API_URL}${getMoviesUrl("")}`).then(
		res => res.json()
	)

	return movies.map(movie => ({
		params: {
			slug: movie.slug
		}
	}))
}

export default async function MoviePage({
	params
}: {
	params: { slug: string }
}) {
	const { movie, similarMovies } = await getMovies({
		slug: params.slug
	})

	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies} />
	) : null
}
