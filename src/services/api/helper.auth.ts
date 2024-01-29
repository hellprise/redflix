// import axios from 'axios'
//
// import { ESecureStore, IAuthResponse } from '@/shared/types/auth.interface'
//
// import { saveToStorage } from '@/services/auth/auth.helper'
//
// import { API_URL, getAuthUrl } from '@/config/api.config'
//
// export const getNewTokens = async () => {
// 	try {
// 		const refreshToken = await getItemAsync(ESecureStore.REFRESH_TOKEN)
//
// 		const response = await axios.post<string, { data: IAuthResponse }>(
// 			API_URL + getAuthUrl('/login/access-token'),
// 			{
// 				refreshToken
// 			},
// 			{
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 			}
// 		)
//
// 		if (response.data.accessToken) await saveToStorage(response.data)
//
// 		return
// 	} catch (error) {
// 		throw error
// 	}
// }
