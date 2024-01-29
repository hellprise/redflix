import Link from "next/link"

import { getMovieUrl } from "@/config/url.config"

interface IAuthButton {
	slug: string
}

export function AuthButton({ slug }: IAuthButton) {
	return (
		<Link
			href={`/auth/redirect=${getMovieUrl(slug)}`}
			className="btn-primary px-7 py-2 text-lg"
		>
			Sign In
		</Link>
	)
}
