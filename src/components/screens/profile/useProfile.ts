import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { toastr } from "react-redux-toastr"

import { UserService } from "@/services/user/user.service"

import { IAuthFormData } from "@/shared/types/auth.interface"

import { toastError } from "@/utils/toast-error"

export const useProfile = (setValue: UseFormSetValue<IAuthFormData>) => {
	const {
		data: profile,
		isSuccess,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["profile"],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data
	})

	const { mutateAsync, isSuccess: isUpdateMovieSuccess } = useMutation({
		mutationKey: ["update profile"],
		mutationFn: (data: IAuthFormData) => UserService.updateProfile(data),
		onSuccess: () => {
			toastr.success("Success", "Profile updated successfully")
		},
		onError: error => {
			toastError(error, "Profile edit error")
		}
	})

	const onSubmit: SubmitHandler<IAuthFormData> = async data => {
		await mutateAsync(data)
	}

	useEffect(() => {
		if (isError) toastError(error, "Get profile")
	}, [isError, error])

	useEffect(() => {
		if (isSuccess) {
			setValue("email", profile.email)
		}
	}, [profile, isSuccess, setValue])

	return {
		onSubmit,
		isLoading
	}
}
