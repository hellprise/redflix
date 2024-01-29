import { GalleryItem } from "@/components/ui/gallery/GalleryItem"

import st from "./Gallery.module.scss"
import { IGalleryItem } from "./gallery.interface"

interface IGallery {
	data: IGalleryItem[]
}

export function Gallery({ data }: IGallery) {
	return (
		<section className={st.gallery}>
			{data.map(item => (
				<GalleryItem item={item} variant="vertical" key={item.slug} />
			))}
		</section>
	)
}
