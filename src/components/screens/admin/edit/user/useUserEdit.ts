import { useMutation, useQuery } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { toastr } from "react-redux-toastr"

import { UserService } from "@/services/user/user.service"

import { getAdminUrl } from "@/config/url.config"

import { IUserEditInput } from "@/shared/types/user.interface"

import { getKeys } from "@/utils/getKeys"
import { toastError } from "@/utils/toast-error"

export const useUserEdit = (
	setValue: UseFormSetValue<IUserEditInput>,
	id: string
) => {
	const userId = String(id)

	const {
		data: user,
		isSuccess,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["user", userId],
		queryFn: () => UserService.getById(userId),
		enabled: !!userId,
		select: ({ data }) => data
	})

	const { mutateAsync, isSuccess: isUpdateUserSuccess } = useMutation({
		mutationKey: ["update user"],
		mutationFn: (data: IUserEditInput) => UserService.updateUser(userId, data),
		onSuccess: () => {
			toastr.success("Success", "User updated successfully")
		},
		onError: error => {
			toastError(error, "User edit error")
		}
	})

	const onSubmit: SubmitHandler<IUserEditInput> = async data => {
		await mutateAsync(data)
	}

	useEffect(() => {
		if (isError) toastError(error, "Get user error")
	}, [isError, error])

	useEffect(() => {
		if (isSuccess) {
			getKeys(user).forEach(key => {
				const typedKey = key as keyof IUserEditInput
				setValue(typedKey, user[key])
			})
		}
	}, [user, isSuccess, setValue])

	useEffect(() => {
		if (isUpdateUserSuccess) {
			redirect(getAdminUrl("users"))
		}
	}, [isUpdateUserSuccess])

	return {
		onSubmit,
		isLoading
	}
}
