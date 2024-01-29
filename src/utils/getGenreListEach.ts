import { IGenre } from "@/shared/types/genre.interface"

export const getGenreListEach = (
	index: number,
	length: number,
	name: string
) => (index + 1 === length ? name : name + ", ")

export const getGenresList = (genres: IGenre[]) =>
	genres.reduce((acc, { name }, index) => {
		return acc + getGenreListEach(index, genres.length, name)
	}, "")
