import { useQuery } from "@tanstack/react-query"

import { IMenuItem } from "@/components/layout/navigation/menu/menu.interface"

import { GenreService } from "@/services/genre/genre.service"

import { getGenreUrl } from "@/config/url.config"

export const usePopularGenres = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["popular genres menu"],
		queryFn: () => GenreService.getAll(),
		select: ({ data }) =>
			data
				.filter(genre => genre.icon)
				.map(
					genre =>
						({
							slug: getGenreUrl(genre.slug),
							title: genre.name,
							icon: genre.icon
						}) as IMenuItem
				)
				.splice(0, 4)
	})

	// useEffect(() => {
	// 	if (isError) {
	// 		//     toast message
	// 	}
	// }, [isError])

	return {
		genres: data,
		isLoading
	}
}
