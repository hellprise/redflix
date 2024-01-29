"use client"

import { AdminHeader, AdminTable } from "@/components/ui"

import { useActors } from "./useActors"

export function AdminActors() {
	const {
		data: actors,
		isLoading,
		searchTerm,
		handleSearch,
		removeActorAsync,
		createActorAsync
	} = useActors()

	return (
		<>
			<AdminHeader
				title="Actors"
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				isLoading={isLoading}
				onClick={createActorAsync}
			/>

			<AdminTable
				tableItems={actors || []}
				headerItems={["Name", "Count movies"]}
				removeHandler={removeActorAsync}
				isLoading={isLoading}
			/>
		</>
	)
}
