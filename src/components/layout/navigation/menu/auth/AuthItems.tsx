"use client"

import { useEffect, useState } from "react"

import { LogoutButton, MenuItem } from "@/components/layout"

import { useAuth } from "@/hooks/useAuth"

import { getAdminHomeUrl } from "@/config/url.config"

interface IAuthItems {}

export function AuthItems({}: IAuthItems) {
	const [isClient, setIsClient] = useState(false)
	const { user, isLoading } = useAuth()

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		isClient && (
			<>
				{user ? (
					<>
						<MenuItem
							item={{
								title: "Profile",
								slug: "/profile",
								icon: "MdSettings"
							}}
						/>

						<LogoutButton />
					</>
				) : (
					<MenuItem
						item={{
							title: "Login",
							slug: "/auth",
							icon: "MdLogin"
						}}
					/>
				)}

				{user?.isAdmin && (
					<MenuItem
						item={{
							title: "Admin panel",
							slug: getAdminHomeUrl(),
							icon: "MdOutlineLock"
						}}
					/>
				)}
			</>
		)
	)
}
