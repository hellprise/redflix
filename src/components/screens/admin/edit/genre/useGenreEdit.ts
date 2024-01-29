import { useMutation, useQuery } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { toastr } from "react-redux-toastr"

import { GenreService } from "@/services/genre/genre.service"

import { getAdminUrl } from "@/config/url.config"

import { IGenreEditInput } from "@/shared/types/genre.interface"

import { getKeys } from "@/utils/getKeys"
import { toastError } from "@/utils/toast-error"

export const useGenreEdit = (
	setValue: UseFormSetValue<IGenreEditInput>,
	id: string
) => {
	const genreId = String(id)

	const {
		data: genre,
		isSuccess,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["genre", genreId],
		queryFn: () => GenreService.getById(genreId),
		enabled: !!genreId,
		select: ({ data }) => data
	})

	const { mutateAsync, isSuccess: isUpdateGenreSuccess } = useMutation({
		mutationKey: ["update genre"],
		mutationFn: (data: IGenreEditInput) => GenreService.update(genreId, data),
		onSuccess: () => {
			toastr.success("Success", "Genre updated successfully")
			// redirect(getAdminUrl("genres"))
		},
		onError: error => {
			toastError(error, "Genre edit error")
		}
	})

	const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data)
	}

	useEffect(() => {
		if (isError) toastError(error, "Get genre error")
	}, [isError, error])

	useEffect(() => {
		if (isSuccess) {
			getKeys(genre).forEach(key => {
				const typedKey = key as keyof IGenreEditInput
				setValue(typedKey, genre[key])
			})
		}
	}, [genre, isSuccess, setValue])

	useEffect(() => {
		if (isUpdateGenreSuccess) {
			redirect(getAdminUrl("genres"))
		}
	}, [isUpdateGenreSuccess])

	return {
		onSubmit,
		isLoading
	}
}
