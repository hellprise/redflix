"use client"

import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { toastr } from "react-redux-toastr"

import { useFavorites } from "@/hooks/useFavorites"

import { UserService } from "@/services/user/user.service"

import { toastError } from "@/utils/toast-error"

import st from "./FavoriteButton.module.scss"
import HeartImage from "./heart-animation.png"

interface IFavoriteButton {
	movieId: string
}

export function FavoriteButton({ movieId }: IFavoriteButton) {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoritesMovies, refetch } = useFavorites()

	const { mutateAsync, isSuccess: isUpdateUserSuccess } = useMutation({
		mutationKey: ["update favorites"],
		mutationFn: () => UserService.toggleFavorite(movieId),
		onSuccess: () => {
			setIsSmashed(!isSmashed)
			refetch()
			toastr.success(
				"Success",
				"You have successfully updated your favorites list"
			)
		},
		onError: error => {
			toastError(error, "User favorites list")
		}
	})

	useEffect(() => {
		if (!favoritesMovies) return

		const isHasMovie = favoritesMovies.some(movie => movie._id === movieId)

		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
	}, [favoritesMovies, isSmashed, movieId])

	return (
		<button
			className={clsx(st.button, {
				[st.animate]: isSmashed
			})}
			onClick={() => mutateAsync()}
			style={{
				backgroundImage: `url(${HeartImage.src})`
			}}
		/>
	)
}
