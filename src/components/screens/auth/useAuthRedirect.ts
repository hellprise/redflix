import { redirect as nextRedirect, useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAuth } from "@/hooks/useAuth"

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { push, replace } = useRouter()

	const redirect = nextRedirect ? String(nextRedirect) : "/"

	useEffect(() => {
		if (user) {
			// push(redirect)
			replace("/")
		}
		// }, [user, redirect, push])
	}, [user, replace, push])
}
