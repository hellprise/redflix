import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { useDebounce } from "@/hooks/useDebounce"

import { MovieService } from "@/services/movie/movie.service"

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState("")

	const deboucedSearch = useDebounce(searchTerm, 500)

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["popular movies", deboucedSearch],
		queryFn: () => MovieService.getAll(deboucedSearch),
		// select: ({ data }) => data.slice(0, 3),
		select: ({ data }) => data,
		enabled: !!deboucedSearch
	})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value)

	return { movies: data, isSuccess, searchTerm, handleSearch }
}
