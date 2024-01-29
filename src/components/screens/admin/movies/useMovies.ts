import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/components/ui/admin/admin-table/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { MovieService } from "@/services/movie/movie.service"

import { getAdminUrl } from "@/config/url.config"

import { getGenresList } from "@/utils/getGenreListEach"
import { toastError } from "@/utils/toast-error"

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState("")

	const deboucedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ["admin movies list", deboucedSearch],
		queryFn: async () => MovieService.getAll(deboucedSearch),
		select: ({ data }) =>
			data.map(
				(movie): ITableItem => ({
					_id: movie._id,
					editUrl: getAdminUrl(`movie/edit/${movie._id}`),
					items: [
						movie.title,
						getGenresList(movie.genres),
						String(movie.rating)
					]
				})
			)
		// enabled: !!deboucedSearch
	})

	const { mutateAsync: removeMovieAsync } = useMutation({
		mutationKey: ["delete movie"],
		mutationFn: async (movieId: string) => MovieService.delete(movieId),
		onSuccess: () => {
			toastr.success("Delete movie", "Delete movie successful")
			queryData.refetch()
		},
		onError: error => toastError(error, "Movie delete error")
	})

	const { mutateAsync: createMovieAsync } = useMutation({
		mutationKey: ["create movie"],
		mutationFn: async () => MovieService.create(),
		onSuccess: ({ data: _id }) => {
			toastr.success("Create movie", "Redirecting to movie edit page")
			push(getAdminUrl(`movie/edit/${_id}`))
		},
		onError: error => toastError(error, "Movie create error")
	})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value)

	useEffect(() => {
		if (queryData.isError) {
			toastError(queryData.error, "Movie list error")
		}
	}, [queryData.isError, queryData.error])

	return useMemo(
		() => ({
			...queryData,
			searchTerm,
			handleSearch,
			removeMovieAsync,
			createMovieAsync
		}),
		[removeMovieAsync, createMovieAsync, queryData, searchTerm]
	)
}
