import { AuthButton } from "./AuthButton"

interface IAuthPlaceholder {
	slug: string
}

export function AuthPlaceholder({ slug }: IAuthPlaceholder) {
	return (
		<section className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-70">
			<p className="mb-1">You must be logged in to start watching.</p>

			<AuthButton slug={slug} />
		</section>
	)
}
