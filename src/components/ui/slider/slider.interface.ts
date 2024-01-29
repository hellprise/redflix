import { IMovie } from "@/shared/types/movie.interface"

export interface ISlide extends Pick<IMovie, "_id" | "bigPoster" | "title"> {
	subtitle: string
	slug: string
}
