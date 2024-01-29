import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/components/ui/admin/admin-table/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { ActorService } from "@/services/actor/actor.service"

import { getAdminUrl } from "@/config/url.config"

import { toastError } from "@/utils/toast-error"

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState("")

	const deboucedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ["admin actors list", deboucedSearch],
		queryFn: async () => ActorService.getAll(deboucedSearch),
		select: ({ data }) =>
			data.map(
				(actor): ITableItem => ({
					_id: actor._id,
					editUrl: getAdminUrl(`actor/edit/${actor._id}`),
					items: [actor.name, String(actor.countMovies)]
				})
			)
		// enabled: !!deboucedSearch
	})

	const { mutateAsync: removeActorAsync } = useMutation({
		mutationKey: ["delete actor"],
		mutationFn: async (actorId: string) => ActorService.delete(actorId),
		onSuccess: () => {
			toastr.success("Delete actor", "Delete actor successful")
			queryData.refetch()
		},
		onError: error => toastError(error, "Actor delete error")
	})

	const { mutateAsync: createActorAsync } = useMutation({
		mutationKey: ["create actor"],
		mutationFn: async () => ActorService.create(),
		onSuccess: ({ data: _id }) => {
			toastr.success("Create actor", "Redirecting to actor edit page")
			push(getAdminUrl(`actor/edit/${_id}`))
		},
		onError: error => toastError(error, "Actor create error")
	})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value)

	useEffect(() => {
		if (queryData.isError) {
			toastError(queryData.error, "Actor list error")
		}
	}, [queryData.isError, queryData.error])

	return useMemo(
		() => ({
			...queryData,
			searchTerm,
			handleSearch,
			removeActorAsync,
			createActorAsync
		}),
		[removeActorAsync, createActorAsync, queryData, searchTerm]
	)
}
