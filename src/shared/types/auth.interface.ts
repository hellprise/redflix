import { IUser } from '@/shared/types/user.interface'

export interface IAuthFormData extends Pick<IUser, 'email' | 'password'> {}

export enum EAuthVariation {
	REGISTER = 'register',
	LOGIN = 'login'
}

export enum ESecureStore {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export enum EAsyncStorage {
	USER = 'user'
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
