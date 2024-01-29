import { IActor } from './actor.interface'
import { IGenre } from './genre.interface'

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	slug: string
	rating: number
	videoUrl: string
	countOpened: number
	genres: IGenre[]
	actors: IActor[]
	isSendTelegram: boolean
	createdAt: string
	parameters: IMovieParameters
}

export interface IMovieParameters {
	year: number
	duration: number
	country: string
	_id: string
}

export interface IMovieEditInput extends Omit<IMovie, '_id'> {}
