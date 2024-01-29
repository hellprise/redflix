import { createSlice } from "@reduxjs/toolkit"

import { auth, checkAuth, logout } from "@/store/user/user.actions"
import { IInitialState } from "@/store/user/user.interface"

import { getStoreLocalStorage } from "@/utils/local-storage"

const initialState: IInitialState = {
	user: getStoreLocalStorage("user"),
	isLoading: false
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(auth.pending, state => {
				state.isLoading = true
			})
			.addCase(auth.fulfilled, (state, { payload }) => {
				state.isLoading = true
				state.user = payload.user
			})
			.addCase(auth.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})

export const { reducer: userReducer } = userSlice
