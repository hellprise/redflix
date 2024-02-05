import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastr } from "react-redux-toastr"

import { errorCatch } from "@/services/api/error.api"
import { AuthService } from "@/services/auth/auth.service"

import { IEmailPassword } from "@/store/user/user.interface"

import { EAuthVariation, IAuthResponse } from "@/shared/types/auth.interface"

import { toastError } from "@/utils/toast-error"

const authToastData = {
	register: {
		title: "Registration",
		message: "You have successfully registered"
	},
	login: {
		title: "Login",
		message: "You have successfully logged in"
	}
}

// auth
export const auth = createAsyncThunk<
	IAuthResponse,
	IEmailPassword & { type: EAuthVariation }
>("auth/main", async ({ email, password, type }, thunkAPI) => {
	try {
		const response = await AuthService.main(type, email, password)
		// const response = await AuthService.login(email, password)

		toastr.success(authToastData[type].title, authToastData[type].message)

		return response.data
	} catch (e) {
		toastError(e)
		return thunkAPI.rejectWithValue(e)
	}
})

//logout
export const logout = createAsyncThunk("auth/logout", async () => {
	try {
		await AuthService.logout()
	} catch (e) {
		toastError(e)
	}
})

// checkAuth
export const checkAuth = createAsyncThunk<IAuthResponse>(
	"auth/check-auth",
	async (_, thunkAPI) => {
		try {
			const response = await AuthService.getNewTokens()

			return response.data
		} catch (e) {
			if (errorCatch(e) === "jwt expired") {
				toastr.error("Session expired", "Please login again")

				// await thunkAPI.dispatch(logout())
				thunkAPI.dispatch(logout())
			}

			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)
