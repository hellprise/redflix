// import { request } from "@/services/api/request.api"
import { getGenresUrl } from "@/config/api.config"

import { IGenre, IGenreEditInput } from "@/shared/types/genre.interface"

import { axiosClassic, instance } from "../api/interceptors.api"

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic<IGenre[]>({
			url: getGenresUrl(""),
			method: "GET",
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<IGenre>({
			url: getGenresUrl(`by-slug/${slug}`),
			method: "GET"
		})
	},

	async getById(_id: string) {
		return instance<IGenreEditInput>({
			url: getGenresUrl(_id),
			method: "GET"
		})
	},

	async getCollections() {
		return axiosClassic<IGenre[]>({
			url: getGenresUrl(`collections`),
			method: "GET"
		})
	},

	async create() {
		return instance<string>({
			url: getGenresUrl(""),
			method: "POST"
		})
	},

	async update(_id: string, data: IGenreEditInput) {
		return instance<string>({
			url: getGenresUrl(_id),
			method: "PUT",
			data
		})
	},

	async delete(_id: string) {
		return instance<string>({
			url: getGenresUrl(_id),
			method: "DELETE"
		})
	}
}
