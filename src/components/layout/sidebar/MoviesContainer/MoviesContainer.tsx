import { FavoriteMovies } from "./favorites/FavoriteMovies"
import { PopularMovies } from "./popular/PopularMovies"

interface IMoviesContainer {}

export function MoviesContainer({}: IMoviesContainer) {
	return (
		<>
			<PopularMovies />
			<FavoriteMovies />
		</>
	)
}
