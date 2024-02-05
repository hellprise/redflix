import { Heading, SubHeading } from "@/components/ui"
import { Gallery } from "@/components/ui/gallery/Gallery"
import { Slider } from "@/components/ui/slider/Slider"

import { getActorUrl, getMovieUrl } from "@/config/url.config"

import { IActor } from "@/shared/types/actor.interface"
import { IMovie } from "@/shared/types/movie.interface"

import { getGenresList } from "@/utils/getGenreListEach"

interface IHomeProps {
	movies: IMovie[]
	trendingMovies: IMovie[]
	actors: IActor[]
}

export function Home({ actors, movies, trendingMovies }: IHomeProps) {
	return (
		<section className="md:space-y-5">
			<Heading
				className="text-xl tracking-wider text-gray-300"
				title="Watch movies online"
			/>

			{movies.length > 0 && (
				<Slider
					slides={movies.map(movie => ({
						_id: movie._id,
						slug: getMovieUrl(movie.slug),
						bigPoster: movie.bigPoster,
						subtitle: getGenresList(movie.genres),
						title: movie.title
					}))}
				/>
			)}

			<div className="space-y-3">
				<SubHeading title="Trending Movies" className="text-gray-300" />

				{trendingMovies.length > 0 && (
					<Gallery
						data={trendingMovies.map(movie => ({
							name: movie.title,
							slug: getMovieUrl(movie.slug),
							posterPath: movie.poster
						}))}
					/>
				)}
			</div>

			<div className="space-y-3">
				<SubHeading title="Best Actors" className="text-gray-300" />

				{actors.length > 0 && (
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
				)}
			</div>
		</section>
	)
}
