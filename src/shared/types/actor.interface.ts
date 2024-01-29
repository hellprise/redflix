export interface IActor {
	_id: string
	name: string
	slug: string
	photo: string
	createdAt: string
	updatedAt: string
	__v: number
	countMovies: number
}

export interface IActorEditInput extends Omit<IActor, "_id"> {}
