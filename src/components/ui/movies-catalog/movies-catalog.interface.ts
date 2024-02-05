import { IMovie } from "@/shared/types/movie.interface"

export interface IMoviesCatalog {
	title: string
	description?: string
	movies: IMovie[]
}
