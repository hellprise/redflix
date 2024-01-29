import { TMaterialIconName } from "./icons.types"

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TMaterialIconName
	createdAt: string
	updatedAt: string
	__v: number
}

export interface IGenreEditInput extends Omit<IGenre, "_id"> {}
