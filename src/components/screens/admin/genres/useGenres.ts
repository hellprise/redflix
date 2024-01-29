import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/components/ui/admin/admin-table/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { GenreService } from "@/services/genre/genre.service"

import { getAdminUrl } from "@/config/url.config"

import { toastError } from "@/utils/toast-error"

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState("")

	const deboucedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ["admin genres list", deboucedSearch],
		queryFn: async () => GenreService.getAll(deboucedSearch),
		select: ({ data }) =>
			data.map(
				(genre): ITableItem => ({
					_id: genre._id,
					editUrl: getAdminUrl(`genre/edit/${genre._id}`),
					items: [genre.name, genre.slug]
				})
			)
	})

	const { mutateAsync: removeGenreAsync } = useMutation({
		mutationKey: ["delete genre"],
		mutationFn: async (genreId: string) => GenreService.delete(genreId),
		onSuccess: () => {
			toastr.success("Delete genre", "Delete genre successful")
			queryData.refetch()
		},
		onError: error => toastError(error, "Genre delete error")
	})

	const { mutateAsync: createGenreAsync } = useMutation({
		mutationKey: ["create genre"],
		mutationFn: async () => GenreService.create(),
		onSuccess: ({ data: _id }) => {
			toastr.success("Create genre", "Redirecting to genre edit page")
			push(getAdminUrl(`genre/edit/${_id}`))
		},
		onError: error => toastError(error, "Genre create error")
	})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value)

	useEffect(() => {
		if (queryData.isError) {
			toastError(queryData.error, "Genre list error")
		}
	}, [queryData.isError, queryData.error])

	return useMemo(
		() => ({
			...queryData,
			searchTerm,
			handleSearch,
			removeGenreAsync,
			createGenreAsync
		}),
		[removeGenreAsync, queryData, searchTerm, createGenreAsync]
	)
}
