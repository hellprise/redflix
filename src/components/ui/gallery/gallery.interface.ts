export interface IGalleryItem {
	posterPath: string
	name: string
	slug: string
	content?: {
		title: string
		subtitle?: string
	}
}

export interface IGalleryItemProps {
	item: IGalleryItem
	variant?: "vertical" | "horizontal"
}
