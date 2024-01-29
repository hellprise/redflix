import { useMutation, useQuery } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { toastr } from "react-redux-toastr"

import { MovieService } from "@/services/movie/movie.service"

import { getAdminUrl } from "@/config/url.config"

import { IMovieEditInput } from "@/shared/types/movie.interface"

import { getKeys } from "@/utils/getKeys"
import { toastError } from "@/utils/toast-error"

export const useMovieEdit = (
	setValue: UseFormSetValue<IMovieEditInput>,
	id: string
) => {
	const movieId = String(id)

	const {
		data: movie,
		isSuccess,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["movie", movieId],
		queryFn: () => MovieService.getById(movieId),
		enabled: !!movieId,
		select: ({ data }) => data
	})

	const { mutateAsync, isSuccess: isUpdateMovieSuccess } = useMutation({
		mutationKey: ["update movie"],
		mutationFn: (data: IMovieEditInput) => MovieService.update(movieId, data),
		onSuccess: () => {
			toastr.success("Success", "Movie updated successfully")
		},
		onError: error => {
			toastError(error, "Movie edit error")
		}
	})

	const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
		await mutateAsync(data)
	}

	useEffect(() => {
		if (isError) toastError(error, "Get movie error")
	}, [isError, error])

	useEffect(() => {
		if (isSuccess) {
			getKeys(movie).forEach(key => {
				const typedKey = key as keyof IMovieEditInput
				setValue(typedKey, movie[key])
			})
		}
	}, [movie, isSuccess, setValue])

	useEffect(() => {
		if (isUpdateMovieSuccess) {
			redirect(getAdminUrl("movies"))
		}
	}, [isUpdateMovieSuccess])

	return {
		onSubmit,
		isLoading
	}
}
