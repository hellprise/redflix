"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { MoviesCatalog } from "@/components/ui/movies-catalog/MoviesCatalog"

import { MovieService } from "@/services/movie/movie.service"

import { toastError } from "@/utils/toast-error"

export default function FreshMoviesPage() {
	const {
		data: movies,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["fresh movies"],
		queryFn: () => MovieService.getAll(),
		select: ({ data }) => data
	})

	useEffect(() => {
		if (isError) toastError(error, "Failed to load movies")
	}, [isError, error])

	return (
		<MoviesCatalog
			title="Fresh movies"
			movies={movies || []}
			isLoading={isLoading}
			description="New movies and series in excellent quality: legal, safe, without ads"
		/>
	)
}
