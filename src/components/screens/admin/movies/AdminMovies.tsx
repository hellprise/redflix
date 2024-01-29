"use client"

import { AdminHeader, AdminTable } from "@/components/ui"

import { useMovies } from "./useMovies"

interface IAdminMovies {}

export function AdminMovies({}: IAdminMovies) {
	const {
		data: movies,
		isLoading,
		searchTerm,
		handleSearch,
		removeMovieAsync,
		createMovieAsync
	} = useMovies()

	return (
		<>
			<AdminHeader
				title="Movies"
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				isLoading={isLoading}
				onClick={createMovieAsync}
			/>

			<AdminTable
				tableItems={movies || []}
				headerItems={["Title", "Genre", "Rating"]}
				removeHandler={removeMovieAsync}
				isLoading={isLoading}
			/>
		</>
	)
}
