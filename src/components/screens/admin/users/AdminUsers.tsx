"use client"

import { AdminHeader, AdminTable } from "@/components/ui"

import { useUsers } from "./useUsers"

export function AdminUsers() {
	const {
		data: users,
		isLoading,
		searchTerm,
		handleSearch,
		removeUserAsync
	} = useUsers()

	return (
		<>
			<AdminHeader
				title="Users"
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				isLoading={isLoading}
			/>

			<AdminTable
				tableItems={users || []}
				headerItems={["Email", "Date register"]}
				removeHandler={removeUserAsync}
				isLoading={isLoading}
			/>
		</>
	)
}
