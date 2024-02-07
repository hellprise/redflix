import Image from "next/image"

import { ICollection } from "./collections.interface"

export function CollectionImage({
	collection: { image, title },
	className,
	isBehind
}: {
	collection: ICollection
	className?: string
	isBehind?: boolean
}) {
	return image !== "image-not-found" ? (
		<Image
			className={className}
			src={image}
			alt={title}
			fill
			priority
			quality={isBehind ? 1 : 40}
			draggable={false}
		/>
	) : (
		<div className="absolute rounded-lg shadow-md" />
	)
}
