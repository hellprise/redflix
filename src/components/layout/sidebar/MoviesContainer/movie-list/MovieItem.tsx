import Image from "next/image"
import Link from "next/link"

import { MaterialIcon } from "@/components/ui"

import { getGenreUrl, getMovieUrl } from "@/config/url.config"

import { IMovie } from "@/shared/types/movie.interface"

import { cutString } from "@/utils/cutString"
import { getGenreListEach } from "@/utils/getGenreListEach"

interface IMovieItem {
	movie: IMovie
}

export function MovieItem({ movie }: IMovieItem) {
	return (
		<li className="group flex gap-5" key={movie._id}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					className="rounded-lg border border-transparent object-cover transition-colors group-hover:border-primary/60"
					src={movie.poster}
					alt={movie.title}
					width={75}
					height={150}
					priority
					draggable={false}
				/>
			</Link>

			<section className="flex flex-col justify-between">
				<div>
					<h3 className="truncate text-lg font-medium">
						{cutString(movie.title, 15)}
					</h3>

					<p className="text-sm text-gray-600">
						{movie.genres.map((genre, index) => (
							<Link key={genre._id} href={getGenreUrl(genre.slug)}>
								{getGenreListEach(index, movie.genres.length, genre.name)}
							</Link>
						))}
					</p>
				</div>

				<div className="flex items-center gap-1.5">
					<MaterialIcon name="MdStarRate" className="text-lg text-yellow-700" />
					<span className="text-white/80">{movie.rating.toFixed(1)}</span>
				</div>
			</section>
		</li>
	)
}
