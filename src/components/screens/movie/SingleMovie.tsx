"use client"

import clsx from "clsx"
import Link from "next/link"
import { FC, Fragment } from "react"

import { FavoriteButton } from "@/components/screens/favorites/button/FavoriteButton"
import { RateMovie } from "@/components/screens/movie/rate/RateMovie"
import { useUpdateCountOpened } from "@/components/screens/movie/useUpdateCountOpened"
import { MaterialIcon, SubHeading } from "@/components/ui"
import { Banner } from "@/components/ui/banner/Banner"
import { Gallery } from "@/components/ui/gallery/Gallery"
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface"
import { VideoPlayer } from "@/components/ui/video-player/VideoPlayer"

import { getActorUrl, getGenreUrl } from "@/config/url.config"

import { IMovie } from "@/shared/types/movie.interface"

interface ISingleMovie {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

interface ILink {
	_id: string
	slug: string
	title: string
}

export function SingleMovie({ similarMovies, movie }: ISingleMovie) {
	useUpdateCountOpened(movie.slug)

	return (
		<>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<VideoPlayer videoSrc={movie.videoUrl} slug={movie.slug} />

			<section className="mt-12">
				<SubHeading title="Similar movies" />

				<Gallery data={similarMovies} />
			</section>

			<RateMovie id={movie._id} slug={movie.slug} />
		</>
	)
}

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className="relative z-2 p-8">
			<h1 className="mb-1 text-5xl font-semibold uppercase text-white text-shadow">
				{movie.title}
			</h1>

			<section
				className={clsx(
					"flex items-center gap-2 text-white/80 *:after:block *:after:h-1 *:after:w-1 *:after:rounded-full *:after:bg-white"
				)}
			>
				<span className="flex items-center gap-2">{movie.parameters.year}</span>
				<span className="flex items-center gap-2">
					{movie.parameters.country}
				</span>
				<span className="after:!hidden">{movie.parameters.duration} min</span>
			</section>

			<ContentList
				name="Genres"
				data={movie.genres.map(genre => ({
					_id: genre._id,
					slug: getGenreUrl(genre.slug),
					title: genre.name
				}))}
			/>

			<ContentList
				name="Actors"
				data={movie.actors.map(actor => ({
					_id: actor._id,
					slug: getActorUrl(actor.slug),
					title: actor.name
				}))}
			/>

			<section className="st.rating absolute bottom-8 right-8 flex items-center gap-2 text-xl opacity-90">
				<MaterialIcon name="MdStarRate" className="mb-0.5 fill-yellow-700" />

				<span className="text-white">{movie.rating.toFixed(1)}</span>
			</section>

			{/*<section className="my-3 text-white text-opacity-80"></section>*/}
			<FavoriteButton movieId={movie._id} />
		</div>
	)
}

function ContentList({ name, data }: { name: string; data: ILink[] }) {
	return (
		<section className="mt-2 flex items-center gap-2">
			<p className="text-white text-opacity-60">{name}:</p>

			<div className="st.links text-white text-opacity-90">
				{data.map((item, index) => (
					<Fragment key={item._id}>
						<Link href={item.slug} className="text-link">
							{item.title}
						</Link>

						{index !== data.length - 1 && ", "}
					</Fragment>
				))}
			</div>
		</section>
	)
}
