import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/components/ui/admin/admin-table/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { UserService } from "@/services/user/user.service"

import { getAdminUrl } from "@/config/url.config"

import { convertDate } from "@/utils/covertDate"
import { toastError } from "@/utils/toast-error"

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState("")

	const deboucedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ["admin users list", deboucedSearch],
		queryFn: async () => UserService.getAll(deboucedSearch),
		select: ({ data }) =>
			data.map(
				(user): ITableItem => ({
					_id: user._id,
					editUrl: getAdminUrl(`user/edit/${user._id}`),
					items: [user.email, convertDate(user.createdAt)]
				})
			)
		// enabled: !!deboucedSearch
	})

	const { mutateAsync: removeUserAsync } = useMutation({
		mutationKey: ["delete user"],
		mutationFn: async (userId: string) => UserService.deleteUser(userId),
		onSuccess: () => {
			toastr.success("Delete user", "Delete user successful")
			queryData.refetch()
		},
		onError: error => toastError(error, "User delete error")
	})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value)

	useEffect(() => {
		if (queryData.isError) {
			toastError(queryData.error, "User list error")
		}
	}, [queryData.isError, queryData.error])

	return useMemo(
		() => ({ ...queryData, searchTerm, handleSearch, removeUserAsync }),
		[removeUserAsync, queryData, searchTerm]
	)
}
