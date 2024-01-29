"use client"

import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { toastr } from "react-redux-toastr"

import { FileService } from "@/services/upload/file.service"

import { toastError } from "@/utils/toast-error"

type TUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ["upload file"],
		mutationFn: async (file: FormData) => FileService.upload(file, folder),
		onSuccess: ({ data }) => {
			onChange(data[0].url)
			toastr.success("Upload file", "Upload file successful")
		},
		onError: error => toastError(error, "File upload error")
	})

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)

			const files = e.target.files

			if (!files || !files.length) return

			const formData = new FormData()
			formData.append("file", files[0])

			await mutateAsync(formData)

			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadFile,
			isLoading
		}),
		[uploadFile, isLoading]
	)
}
