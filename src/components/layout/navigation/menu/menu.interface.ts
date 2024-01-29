import { TMaterialIconName } from "@/shared/types/icons.types"

export interface IMenuItem {
	icon: TMaterialIconName
	title: string
	slug: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
