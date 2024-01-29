import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

import { MovieService } from "@/services/movie/movie.service"

export const useUpdateCountOpened = (slug: string) => {
	const { mutateAsync } = useMutation({
		mutationKey: ["updateCountOpened"],
		mutationFn: () => MovieService.updateCountOpened(slug)
	})

	useEffect(() => {
		mutateAsync()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
