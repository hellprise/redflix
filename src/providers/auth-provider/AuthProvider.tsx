"use client"

import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
import { FC, PropsWithChildren, useEffect } from "react"

import NotFound from "@/app/not-found"

import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"

import { getAccessToken, getRefreshToken } from "@/services/auth/auth.helper"

import { ADMIN_PANEL_URL } from "@/config/url.config"

import { protectedRoutes } from "./protected-routes.data"

const DynamicCheckRole = dynamic(() => import("./CheckRole"), { ssr: false })

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const pathname = usePathname()

	const router = useRouter()

	const { user } = useAuth()

	const { checkAuth, logout } = useActions()

	useEffect(() => {
		const accessToken = getAccessToken()

		if (accessToken) checkAuth()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const refreshToken = getRefreshToken()

		if (!refreshToken && user) logout()
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	const isProtectedRoute = protectedRoutes.some(
		route => pathname?.startsWith(route)
	)

	const isAdminRoute = pathname?.startsWith(ADMIN_PANEL_URL)

	if (!isProtectedRoute && !isAdminRoute) return <>{children}</>
	else
		return (
			<DynamicCheckRole Component={{ isOnlyUser: true }}>
				{children}
			</DynamicCheckRole>
		)

	if (user?.isAdmin) return <>{children}</>
	if (user && isProtectedRoute) return <>{children}</>

	if (user && isAdminRoute) return <NotFound />

	// if (pathname !== "/auth") return <Auth />
	if (pathname !== "/auth") {
		router.replace("/auth")
		return null
	}

	return null
}

export default AuthProvider
