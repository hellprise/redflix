import { Heading } from "@/components/ui"
import { GalleryItem } from "@/components/ui/gallery/GalleryItem"

import { Description } from "../description/Description"

import { IMoviesCatalog } from "./movies-catalog.interface"

export function MoviesCatalog({ movies, title, description }: IMoviesCatalog) {
	return (
		<>
			<Heading title={title} className="mb-3" />

			{description && <Description text={description} />}

			<section className="mt-8 flex flex-wrap gap-7">
				{movies.map(movie => (
					<GalleryItem
						item={{
							slug: movie.slug,
							name: movie.title,
							posterPath: movie.bigPoster,
							content: {
								title: movie.title
							}
						}}
						variant="horizontal"
						key={movie.slug}
					/>
				))}
			</section>
		</>
	)
}
