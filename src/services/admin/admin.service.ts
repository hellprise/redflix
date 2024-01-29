import { instance } from "@/services/api/interceptors.api"

import { getUsersUrl } from "@/config/api.config"

export const AdminService = {
	async getCountUsers() {
		return instance.get<number>(getUsersUrl("count"))
	}
}
