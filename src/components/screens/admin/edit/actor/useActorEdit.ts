import { useMutation, useQuery } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { toastr } from "react-redux-toastr"

import { ActorService } from "@/services/actor/actor.service"

import { getAdminUrl } from "@/config/url.config"

import { IActorEditInput } from "@/shared/types/actor.interface"

import { getKeys } from "@/utils/getKeys"
import { toastError } from "@/utils/toast-error"

export const useActorEdit = (
	setValue: UseFormSetValue<IActorEditInput>,
	id: string
) => {
	const actorId = String(id)

	const {
		data: actor,
		isSuccess,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["actor", actorId],
		queryFn: () => ActorService.getById(actorId),
		enabled: !!actorId,
		select: ({ data }) => data
	})

	const { mutateAsync, isSuccess: isUpdateActorSuccess } = useMutation({
		mutationKey: ["update actor"],
		mutationFn: (data: IActorEditInput) => ActorService.update(actorId, data),
		onSuccess: () => {
			toastr.success("Success", "Actor updated successfully")
			// redirect(getAdminUrl("genres"))
		},
		onError: error => {
			toastError(error, "Actor edit error")
		}
	})

	const onSubmit: SubmitHandler<IActorEditInput> = async data => {
		await mutateAsync(data)
	}

	useEffect(() => {
		if (isError) toastError(error, "Get actor error")
	}, [isError, error])

	useEffect(() => {
		if (isSuccess) {
			getKeys(actor).forEach(key => {
				const typedKey = key as keyof IActorEditInput
				setValue(typedKey, actor[key])
			})
		}
	}, [actor, isSuccess, setValue])

	useEffect(() => {
		if (isUpdateActorSuccess) {
			redirect(getAdminUrl("actors"))
		}
	}, [isUpdateActorSuccess])

	return {
		onSubmit,
		isLoading
	}
}
