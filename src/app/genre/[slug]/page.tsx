import { MoviesCatalog } from "@/components/ui/movies-catalog/MoviesCatalog"

import { API_URL, getGenresUrl, getMoviesUrl } from "@/config/api.config"

import { IGenre } from "@/shared/types/genre.interface"

// async function getGenre({ slug }: { slug: string }) {
// 	const genreRes = await fetch(`${API_URL}${getGenresUrl(`by-slug/${slug}`)}`)
//
// 	if (!genreRes.ok) {
// 		throw new Error("Failed to fetch genre")
// 	}
//
// 	const genre: IGenre = await genreRes.json()
//
// 	const moviesByGenreRes = await fetch(
// 		`${API_URL}${getMoviesUrl(`by-genres`)}`,
// 		{
// 			method: "POST",
// 			body: JSON.stringify({
// 				// genreIds: ["6225b0394bc3c876b7b3bec5"]
// 				genreIds: [genre._id]
// 			}),
// 			headers: {
// 				"Content-Type": "application/json"
// 			}
// 		}
// 	)
//
// 	if (!moviesByGenreRes.ok) {
// 		throw new Error("Failed to fetch movies by genre")
// 	}
//
// 	const moviesByGenre = await moviesByGenreRes.json()
//
// 	return {
// 		genre,
// 		moviesByGenre
// 	}
// }
//
// export async function generateStaticParams() {
// 	const genres: IGenre[] = await fetch(`${API_URL}${getGenresUrl("")}`).then(
// 		res => res.json()
// 	)
//
// 	return genres.map(genre => ({
// 		params: {
// 			slug: genre.slug
// 		}
// 	}))
// }

export default async function GenrePage({
	params
}: {
	params: { slug: string }
}) {
	// const { genre, moviesByGenre } = await getGenre({
	// 	slug: params.slug
	// })

	return (
		<>
			{/*{genre ? (*/}
			{/*	<MoviesCatalog*/}
			{/*		title={genre.name}*/}
			{/*		description={genre.description}*/}
			{/*		movies={moviesByGenre}*/}
			{/*	/>*/}
			{/*) : null}*/}

			<div>
				<h1>GenrePage</h1>
			</div>
		</>
	)
}
