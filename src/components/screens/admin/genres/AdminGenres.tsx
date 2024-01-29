"use client"

import { AdminHeader, AdminTable } from "@/components/ui"

import { useGenres } from "./useGenres"

export function AdminGenres() {
	const {
		data: genres,
		isLoading,
		searchTerm,
		handleSearch,
		removeGenreAsync,
		createGenreAsync
	} = useGenres()

	return (
		<>
			<AdminHeader
				title="Genres"
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				isLoading={isLoading}
				onClick={createGenreAsync}
			/>

			<AdminTable
				tableItems={genres || []}
				headerItems={["Name", "Slug"]}
				removeHandler={removeGenreAsync}
				isLoading={isLoading}
			/>
		</>
	)
}
