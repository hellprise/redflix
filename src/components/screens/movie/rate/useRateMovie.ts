import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toastr } from "react-redux-toastr"

import { useAuth } from "@/hooks/useAuth"

import { RatingService } from "@/services/rating/rating.service"

import { toastError } from "@/utils/toast-error"

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { user } = useAuth()

	const { data, isSuccess, refetch, isError, error } = useQuery({
		queryKey: ["your movie rating", movieId],
		queryFn: () => RatingService.getByUserMovie(movieId),
		enabled: !!movieId && !!user,
		select: ({ data }) => data
	})

	const { mutateAsync } = useMutation({
		mutationKey: ["set rating movie"],
		mutationFn: ({ value }: { value: number }) =>
			RatingService.setRating(movieId, value),
		onSuccess: () => {
			toastr.success("Success", "Movie rating updated successfully")

			setIsSended(true)
			refetch()

			setTimeout(() => {
				setIsSended(false)
			}, 2400)
		},
		onError: error => {
			toastError(error, "Movie rating")
		}
	})

	const handleClick = async (nextValue: number) => {
		await mutateAsync({ value: nextValue })
	}

	useEffect(() => {
		if (isError) toastError(error, "Get rating")
	}, [isError, error])

	useEffect(() => {
		if (isSuccess) setRating(data)
	}, [isSuccess, data])

	return {
		rating,
		isSended,
		handleClick
	}
}
