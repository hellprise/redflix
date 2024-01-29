interface INotAuthFavorites {}

export function NotAuthFavorites({}: INotAuthFavorites) {
	return (
		<p className="mt-10 w-full animate-fade rounded-lg bg-gray-800 p-4 text-white/80">
			For viewing favorites plz autorize!
		</p>
	)
}
