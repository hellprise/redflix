import { MouseEvent } from "react"

import { MaterialIcon } from "@/components/ui"

import { useActions } from "@/hooks/useActions"

export function LogoutButton() {
	const { logout } = useActions()

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		logout()
	}

	return (
		<a
			className="group flex cursor-pointer items-center gap-3 text-gray-600"
			onClick={handleLogout}
		>
			<MaterialIcon
				className="text-2lg transition-colors group-hover:text-primary"
				name="MdLogout"
			/>

			<span className="text-lg transition-colors group-hover:text-white">
				Logout
			</span>
		</a>
	)

	// return (
	// 	<li>
	// 		<Link onClick={handleLogout} href="/">
	// 			<MaterialIcon name="MdLogout" />
	// 		</Link>
	// 	</li>
	// )
}
