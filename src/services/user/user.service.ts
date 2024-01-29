import { instance } from "@/services/api/interceptors.api"

// import { request } from '@/services/api/request.api'
import { getUsersUrl } from "@/config/api.config"

import { IAuthFormData } from "@/shared/types/auth.interface"
import { IMovie } from "@/shared/types/movie.interface"
import { IUser } from "@/shared/types/user.interface"

export const UserService = {
	async getAll(searchTerm?: string) {
		return instance<IUser[]>({
			url: getUsersUrl(""),
			method: "GET",
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getProfile() {
		return instance<IUser>({
			url: getUsersUrl("profile"),
			method: "GET"
		})
	},

	async getFavorites() {
		return instance<IMovie[]>({
			url: getUsersUrl("profile/favorites"),
			method: "GET"
		})
	},

	async toggleFavorite(movieId: string) {
		return instance<IMovie>({
			url: getUsersUrl(`profile/favorites`),
			method: "PUT",
			data: {
				movieId
			}
		})
	},

	async getById(_id: string) {
		return instance<IUser>({
			url: getUsersUrl(`${_id}`),
			method: "GET"
		})
	},

	async updateProfile(data: IAuthFormData) {
		return instance<string>({
			url: getUsersUrl("profile"),
			method: "PUT",
			data
		})
	},

	async updateUser(_id: string, data: IAuthFormData) {
		return instance<string>({
			url: getUsersUrl(`${_id}`),
			method: "PUT",
			data
		})
	},

	async deleteUser(_id: string) {
		return instance<string>({
			url: getUsersUrl(`${_id}`),
			method: "DELETE"
		})
	}
}
