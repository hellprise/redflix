import { instance } from "@/services/api/interceptors.api"

import { getRatingsUrl } from "@/config/api.config"

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return instance<string>({
			url: getRatingsUrl("set-rating"),
			method: "POST",
			data: {
				movieId,
				value
			}
		})
	},

	async getByUserMovie(movieId: string) {
		return instance<number>({
			url: getRatingsUrl(`${movieId}`),
			method: "GET"
		})
	}
}
