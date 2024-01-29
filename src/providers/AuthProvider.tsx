// 'use client'
//
// import { usePathname, useRouter } from 'next/navigation'
// import { FC, PropsWithChildren, useEffect } from 'react'
//
// import { useAuth } from '@/hooks/useAuth'
//
// export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
// 	const { user, isAuthenticated } = useAuth()
//
// 	const router = useRouter()
// 	const pathname = usePathname()
//
// 	useEffect(() => {
// 		if (isAuthenticated) {
// 			// TODO: do this with cookies (install cookies library, maybe) and cut it to the services
// 			window.localStorage.setItem('token', user?.jwt || '')
// 		}
// 	}, [user, isAuthenticated])
//
// 	useEffect(() => {
// 		if (pathname !== '/login' && pathname !== '/register') {
// 			// don't do this in real life, this is just for the demo
// 			const isLoggedIn = !!window.localStorage.getItem('token')
//
// 			if (!isLoggedIn) router.push('/login')
// 		}
// 	}, [pathname])
//
// 	useEffect(() => {
// 		if (isAuthenticated) document.body.classList.add('grid-cols-layout')
// 	}, [isAuthenticated])
//
// 	return <>{children}</>
// }
