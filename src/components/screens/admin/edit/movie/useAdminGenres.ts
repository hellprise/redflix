import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { IOption } from "@/components/ui/select/select.interface"

import { GenreService } from "@/services/genre/genre.service"

import { toastError } from "@/utils/toast-error"

export const useAdminGenres = () => {
	const queryData = useQuery({
		queryKey: ["list of genres"],
		queryFn: async () => GenreService.getAll(),
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id
				})
			)
	})

	useEffect(() => {
		if (queryData.isError) {
			toastError(queryData.error, "Get genres error")
		}
	}, [queryData.isError, queryData.error])

	return queryData
}
