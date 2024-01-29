import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

import { getMovieUrl } from "@/config/url.config"

import { IMovie } from "@/shared/types/movie.interface"

interface ISearchList {
	movies: IMovie[]
}

export function SearchList({ movies }: ISearchList) {
	return (
		<section className="absolute top-[calc(100%+15px)] z-10 max-h-[365px] w-full animate-fade overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 no-scrollbar">
			{movies.length ? (
				<ul className="flex flex-col gap-3 py-3 pl-4 pr-1">
					{movies.map(movie => (
						<li key={movie._id}>
							<Link
								className={clsx(
									"relative flex items-center gap-5",
									"after:absolute after:-right-0.5 after:top-[28%] after:h-0 after:w-0.5 after:bg-transparent after:transition-all after:duration-300 hover:after:h-2/5 hover:after:bg-primary"
								)}
								href={getMovieUrl(movie.slug)}
							>
								<Image
									className="rounded-lg object-cover"
									src={movie.poster}
									alt={movie.title}
									width={50}
									height={75}
									draggable={false}
								/>

								<h4 className="truncate font-medium last:w-[70%]">
									{movie.title}
								</h4>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p className="px-4 py-3 text-white text-opacity-80 underline underline-offset-2">
					No results found
				</p>
			)}
		</section>
	)
}
