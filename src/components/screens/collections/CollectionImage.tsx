import Image from "next/image"

import { ICollection } from "./collections.interface"

export function CollectionImage({
	collection: { image, title },
	className
}: {
	collection: ICollection
	className?: string
}) {
	return image !== "image-not-found" ? (
		<Image
			className={className}
			src={image}
			alt={title}
			fill
			priority
			draggable={false}
		/>
	) : (
		<div className="absolute rounded-lg shadow-md" />
	)
}
