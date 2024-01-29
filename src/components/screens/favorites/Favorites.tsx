"use client"

import { FavoriteItem } from "@/components/screens/favorites/FavoriteItem"
import { Heading, SkeletonLoader } from "@/components/ui"

import { useFavorites } from "@/hooks/useFavorites"

import st from "./Favorites.module.scss"

export function Favorites() {
	const { favoritesMovies, isLoading } = useFavorites()

	return (
		<>
			<Heading title="Favorites" />

			<section className={st.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={st.skeletonLoader}
						containerClassName={st.containerLoader}
					/>
				) : (
					favoritesMovies?.map(movie => (
						<FavoriteItem
							// movie={movie as unknown as IFavoriteItem}
							movie={{
								_id: movie._id,
								slug: movie.slug,
								title: movie.title,
								posterPath: movie.poster,
								name: movie.title
							}}
							key={movie._id}
						/>
					))
				)}
			</section>
		</>
	)
}
