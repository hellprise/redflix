"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Next13ProgressBar } from "next13-progressbar"
import { FC, PropsWithChildren } from "react"
import { Provider } from "react-redux"

import { ReduxToast } from "@/providers/ReduxToast"

import { store } from "@/store/store"

import { accentColor } from "@/config/constants.config"

import AuthProvider from "./auth-provider/AuthProvider"

// import { AuthProvider } from './AuthProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export const MainProvider: FC<PropsWithChildren<unknown>> = ({ children }) => (
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<Next13ProgressBar
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height="3px"
				options={{
					showSpinner: false
				}}
			/>
			<ReduxToast />
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	</Provider>
)
