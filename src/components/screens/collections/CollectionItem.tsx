import clsx from "clsx"
import Link from "next/link"

import { getGenreUrl } from "@/config/url.config"

import { CollectionImage } from "./CollectionImage"
import st from "./Collections.module.scss"
import { ICollection } from "./collections.interface"

export function CollectionItem({ collection }: { collection: ICollection }) {
	return (
		<Link className={st.collection} href={getGenreUrl(collection.slug)}>
			<CollectionImage className="z-1" collection={collection} />

			<div className={st.content}>
				<h3 className={st.title}>{collection.title}</h3>
			</div>

			<div className={clsx(st.behind, st.second)}>
				<CollectionImage collection={collection} isBehind />
			</div>
			<div className={clsx(st.behind, st.third)}>
				<CollectionImage collection={collection} isBehind />
			</div>
		</Link>
	)
}
