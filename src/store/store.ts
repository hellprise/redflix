import { configureStore } from "@reduxjs/toolkit"

import { reducers } from "./rootReducer"

export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== "production"
})

export type TRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
