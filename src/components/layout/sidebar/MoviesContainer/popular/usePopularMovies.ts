"use client"

import { useQuery } from "@tanstack/react-query"

import { MovieService } from "@/services/movie/movie.service"

export const usePopularMovies = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["popular movies in sidebar"],
		queryFn: () => MovieService.getMostPopular(),
		select: ({ data }) => data.slice(0, 3)
	})

	return { movies: data, isLoading }
}
