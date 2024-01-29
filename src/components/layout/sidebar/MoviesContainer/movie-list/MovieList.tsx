import Link from "next/link"

import { Button } from "@/components/ui"

import { MovieItem } from "./MovieItem"
import { IMovieList } from "./movie-list.interface"

export function MovieList({ title, link, movies }: IMovieList) {
	return (
		<section>
			<h2 className="mb-6 text-2lg font-semibold capitalize">{title}</h2>

			{movies && movies.length ? (
				<>
					<ul className="mb-6 flex animate-fade flex-col gap-6">
						{movies.map(movie => (
							<MovieItem movie={movie} key={movie._id} />
						))}
					</ul>

					<Link href={link}>
						<Button className="block">See more</Button>
					</Link>
				</>
			) : (
				<p className="my-5 text-white text-opacity-80 underline underline-offset-2">
					No popular movies yet
				</p>
			)}
		</section>
	)
}
