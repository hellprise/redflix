import Cookies from "js-cookie"

import { getContentType } from "@/services/api/api.helper"
import { axiosClassic } from "@/services/api/interceptors.api"
import { deleteTokensStorage, saveToStorage } from "@/services/auth/auth.helper"

import { getAuthUrl } from "@/config/api.config"

import {
	EAsyncStorage,
	EAuthVariation,
	ESecureStore,
	IAuthResponse
} from "@/shared/types/auth.interface"

export const AuthService = {
	async main(
		variant: EAuthVariation.REGISTER | EAuthVariation.LOGIN,
		email: string,
		password: string
	) {
		console.log("AuthService.main", variant, email, password)
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl(
				`${variant === EAuthVariation.REGISTER ? "register" : "login"}`
			),
			{
				email,
				password
			}
		)

		if (response.data.accessToken) await saveToStorage(response.data)

		return response
	},

	async login(email: string, password: string) {
		console.log("AuthService.LOGIN", email, password)
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl(`login`),
			{
				method: "POST",
				data: { email, password }
			}
		)

		if (response.data.accessToken) await saveToStorage(response.data)

		return response
	},

	logout() {
		deleteTokensStorage()
		localStorage.removeItem(EAsyncStorage.USER)
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(ESecureStore.REFRESH_TOKEN)

		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl("login/access-token"),
			{ refreshToken },
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) await saveToStorage(response.data)

		return response
	}
}
