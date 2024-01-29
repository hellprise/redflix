import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { IOption } from "@/components/ui/select/select.interface"

import { ActorService } from "@/services/actor/actor.service"

import { toastError } from "@/utils/toast-error"

export const useAdminActors = () => {
	const queryData = useQuery({
		queryKey: ["list of actors"],
		queryFn: async () => ActorService.getAll(),
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id
				})
			)
	})

	useEffect(() => {
		if (queryData.isError) {
			toastError(queryData.error, "Get actors error")
		}
	}, [queryData.isError, queryData.error])

	return queryData
}
