"use client"

import { useEffect, useState } from "react"

import { MovieList } from "@/components/layout/sidebar/MoviesContainer/movie-list/MovieList"
import { SkeletonLoader } from "@/components/ui"

import { useAuth } from "@/hooks/useAuth"
import { useFavorites } from "@/hooks/useFavorites"

import { NotAuthFavorites } from "./NotAuthFavorites"

interface IFavoriteMovies {}

export function FavoriteMovies({}: IFavoriteMovies) {
	const [isClient, setIsClient] = useState(false)

	const { user } = useAuth()

	const { favoritesMovies, isLoading } = useFavorites()

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (isClient && !user) return <NotAuthFavorites />

	return (
		<>
			{isClient && (
				<div className="mt-11 pr-11">
					{!isLoading ? (
						<MovieList
							title="Favorites movies list"
							link="/favorites"
							movies={favoritesMovies?.slice(0, 3) || []}
						/>
					) : (
						<section className="space-y-4">
							<SkeletonLoader count={3} className="h-28" />
						</section>
					)}
				</div>
			)}
		</>
	)
}
