import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/hooks/useAuth"

import { UserService } from "@/services/user/user.service"

export const useFavorites = () => {
	const { user } = useAuth()

	const {
		data: favoritesMovies,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ["favorites"],
		queryFn: () => UserService.getFavorites(),
		select: ({ data }) => data,
		enabled: !!user
	})

	return {
		favoritesMovies,
		isLoading,
		refetch
	}
}
