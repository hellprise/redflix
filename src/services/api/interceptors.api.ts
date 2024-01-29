import axios from "axios"

import { getContentType } from "@/services/api/api.helper"
import { errorCatch } from "@/services/api/error.api"
import {
	deleteTokensStorage,
	getAccessToken
} from "@/services/auth/auth.helper"
import { AuthService } from "@/services/auth/auth.service"

import { API_URL } from "@/config/api.config"

const axiosOptions = {
	baseURL: API_URL,
	headers: getContentType()
}

const axiosClassic = axios.create(axiosOptions)

const instance = axios.create(axiosOptions)

instance.interceptors.request.use(async config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			error?.response?.status === 401 ||
			errorCatch(error) === "jwt expired" ||
			(errorCatch(error) === "jwt must be provided" &&
				error.config &&
				!error.config._isRetry)
		) {
			originalRequest._isRetry = true

			try {
				await AuthService.getNewTokens()

				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === "jwt expired") deleteTokensStorage()
			}
		}

		throw error
	}
)

export { axiosClassic, instance }

// const instance = axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		'Content-Type': 'application/json'
// 	}
// })
//
// instance.interceptors.request.use(async config => {
// 	const accessToken = await getAccessToken()
//
// 	if (config.headers && accessToken) {
// 		config.headers.Authorization = `Bearer ${accessToken}`
// 	}
//
// 	return config
// })
//
// instance.interceptors.response.use(
// 	config => config,
// 	async error => {
// 		const originalRequest = error.config
//
// 		if (
// 			error.response.status === 401 ||
// 			errorCatch(error) === 'jwt expired' ||
// 			(errorCatch(error) === 'jwt must be provided' &&
// 				error.config &&
// 				!error.config._isRetry)
// 		) {
// 			originalRequest._isRetry = true
//
// 			try {
// 				await getNewTokens()
//
// 				return instance.request(originalRequest)
// 			} catch (error) {
// 				if (errorCatch(error) === 'jwt expired') await deleteTokensStorage()
// 			}
// 		}
//
// 		throw error
// 	}
// )
//
// export { instance }
