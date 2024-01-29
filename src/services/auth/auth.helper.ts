import Cookies from "js-cookie"

import {
	EAsyncStorage,
	ESecureStore,
	IAuthResponse,
	ITokens
} from "@/shared/types/auth.interface"

export const getAccessToken = () => {
	const accessToken = Cookies.get(ESecureStore.ACCESS_TOKEN)

	return accessToken || null
}

export const getRefreshToken = () => {
	const refreshToken = Cookies.get(ESecureStore.REFRESH_TOKEN)

	return refreshToken || null
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set(ESecureStore.ACCESS_TOKEN, data.accessToken)
	Cookies.set(ESecureStore.REFRESH_TOKEN, data.refreshToken)
}

export const deleteTokensStorage = () => {
	Cookies.remove(ESecureStore.ACCESS_TOKEN)
	Cookies.remove(ESecureStore.REFRESH_TOKEN)
}

export const getUserFromStorage = () => {
	try {
		return JSON.parse(localStorage.getItem(EAsyncStorage.USER) || "{}")
	} catch (error) {
		return null
	}
}

export const saveToStorage = async (data: IAuthResponse) => {
	await saveTokensStorage(data)

	try {
		localStorage.setItem(EAsyncStorage.USER, JSON.stringify(data.user))
	} catch (error) {}
}
