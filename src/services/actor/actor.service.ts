import { axiosClassic, instance } from "@/services/api/interceptors.api"

// import { request } from '@/services/api/request.api'
import { getActorsUrl } from "@/config/api.config"

import { IActor, IActorEditInput } from "@/shared/types/actor.interface"

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic<IActor[]>({
			url: getActorsUrl(""),
			method: "GET",
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getBySlug(slug: string) {
		return instance<IActor>({
			url: getActorsUrl(`by-slug/${slug}`),
			method: "GET"
		})
	},

	async getById(_id: string) {
		return instance<IActorEditInput>({
			url: getActorsUrl(_id),
			method: "GET"
		})
	},

	async create() {
		return instance<string>({
			url: getActorsUrl(""),
			method: "POST"
		})
	},

	async update(_id: string, data: IActorEditInput) {
		return instance<string>({
			url: getActorsUrl(_id),
			method: "PUT",
			data
		})
	},

	async delete(_id: string) {
		return instance<string>({
			url: getActorsUrl(_id),
			method: "DELETE"
		})
	}
}
