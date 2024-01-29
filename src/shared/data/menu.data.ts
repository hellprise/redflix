import { IMenu } from "@/components/layout/navigation/menu/menu.interface"

export const firstMenu: IMenu = {
	title: "Menu",
	items: [
		{
			title: "Home",
			icon: "MdHome",
			slug: "/"
		},
		{
			title: "Discovery",
			icon: "MdExplore",
			slug: "/discovery"
		},
		{
			title: "Fresh movies",
			icon: "MdRefresh",
			slug: "/fresh"
		},
		{
			title: "Trending now",
			icon: "MdLocalFireDepartment",
			slug: "/trending"
		}
	]
}

export const userMenu: IMenu = {
	title: "General",
	items: []
}
