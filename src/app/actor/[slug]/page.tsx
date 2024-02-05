import { MoviesCatalog } from "@/components/ui/movies-catalog/MoviesCatalog"

import { getContentType } from "@/services/api/api.helper"

import { API_URL, getActorsUrl, getMoviesUrl } from "@/config/api.config"

import { IActor } from "@/shared/types/actor.interface"
import { IMovie } from "@/shared/types/movie.interface"

// async function getActor({ slug }: { slug: string }) {
// 	const actorRes = await fetch(`${API_URL}${getActorsUrl(`by-slug/${slug}`)}`, {
// 		method: "GET",
// 		headers: getContentType()
// 	})
//
// 	if (!actorRes.ok) {
// 		throw new Error("Failed to fetch actor")
// 	}
//
// 	const actor: IActor = await actorRes.json()
//
// 	const moviesByActorRes = await fetch(
// 		`${API_URL}${getMoviesUrl(`by-actor/${actor._id}`)}`,
// 		{
// 			method: "GET",
// 			headers: getContentType()
// 		}
// 	)
//
// 	if (!moviesByActorRes.ok) {
// 		throw new Error("Failed to fetch movies by actor")
// 	}
//
// 	const moviesByActor: IMovie[] = await moviesByActorRes.json()
//
// 	return {
// 		actor,
// 		moviesByActor
// 	}
// }
//
// export async function generateStaticParams() {
// 	const actors: IActor[] = await fetch(`${API_URL}${getActorsUrl("")}`).then(
// 		res => res.json()
// 	)
//
// 	return actors.map(actor => ({
// 		params: {
// 			slug: actor.slug
// 		}
// 	}))
// }

export default async function ActorPage({
	params
}: {
	params: { slug: string }
}) {
	// const { actor, moviesByActor } = await getActor({
	// 	slug: params.slug
	// })

	return (
		<>
			{/*{actor ? (*/}
			{/*	<MoviesCatalog title={actor.name} movies={moviesByActor} />*/}
			{/*) : null}*/}

			<div>
				<h1>ActorPage</h1>
			</div>
		</>
	)
}
