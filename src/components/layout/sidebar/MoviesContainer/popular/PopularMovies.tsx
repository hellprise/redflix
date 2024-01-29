import { SkeletonLoader } from "@/components/ui"

import { MovieList } from "../movie-list/MovieList"

import { usePopularMovies } from "./usePopularMovies"

interface IPopularMovies {}

export function PopularMovies({}: IPopularMovies) {
	const { movies, isLoading } = usePopularMovies()

	return (
		<>
			{isLoading ? (
				<section>
					<SkeletonLoader count={1} height={30} className="mb-6" />

					<SkeletonLoader count={3} className="mb-6 h-[108px]" />

					<SkeletonLoader count={1} height={44} className="!rounded-[10px]" />
				</section>
			) : (
				<MovieList
					title="Popular Movies"
					link="/trending"
					movies={movies || []}
				/>
			)}
		</>
	)
}
