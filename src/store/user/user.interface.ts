export interface IUserState {
	email: string
	isAdmin: boolean
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IEmailPassword {
	email: string
	password: string
}
