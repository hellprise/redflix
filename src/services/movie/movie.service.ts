// import { request } from '@/services/api/request.api'
import { getMoviesUrl } from "@/config/api.config"

import { IMovie, IMovieEditInput } from "@/shared/types/movie.interface"

import { axiosClassic, instance } from "../api/interceptors.api"

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic<IMovie[]>({
			url: getMoviesUrl(""),
			method: "GET",
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<IMovie>({
			url: getMoviesUrl(`by-slug/${slug}`),
			method: "GET"
		})
	},

	async getById(_id: string) {
		return instance<IMovieEditInput>({
			url: getMoviesUrl(_id),
			method: "GET"
		})
	},

	async getByActor(actorId: string) {
		return axiosClassic<IMovie[]>({
			url: getMoviesUrl(`by-actor/${actorId}`),
			method: "GET"
		})
	},

	async getMostPopular() {
		return axiosClassic<IMovie[]>({
			url: getMoviesUrl(`most-popular`),
			method: "GET"
		})
	},

	async getByGenres(genreIds: string[]) {
		return axiosClassic<IMovie[]>({
			url: getMoviesUrl(`by-genres`),
			method: "POST",
			data: { genreIds }
		})
	},

	async updateCountOpened(slug: string) {
		return axiosClassic<IMovie>({
			url: getMoviesUrl(`update-count-opened`),
			method: "PUT",
			data: {
				slug
			}
		})
	},

	async create() {
		return instance<string>({
			url: getMoviesUrl(""),
			method: "POST"
		})
	},

	async update(_id: string, data: IMovieEditInput) {
		return instance<string>({
			url: getMoviesUrl(`${_id}`),
			method: "PUT",
			data
		})
	},

	async delete(_id: string) {
		return instance<string>({
			url: getMoviesUrl(`${_id}`),
			method: "DELETE"
		})
	}
}
