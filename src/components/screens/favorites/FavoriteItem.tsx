import Image from "next/image"
import Link from "next/link"

import { FavoriteButton } from "@/components/screens/favorites/button/FavoriteButton"

import { getMovieUrl } from "@/config/url.config"

import st from "./Favorites.module.scss"
import { IFavoriteItem } from "./favorites.interface"

export function FavoriteItem({ movie }: { movie: IFavoriteItem }) {
	return (
		<section className={st.itemWrapper}>
			<FavoriteButton movieId={movie._id} />

			<Link className={st.item} href={getMovieUrl(movie.slug)}>
				<Image
					src={movie.posterPath}
					alt={movie.name}
					fill
					draggable={false}
					priority
				/>

				<p className={st.title}>{movie.title}</p>
			</Link>
		</section>
	)
}
