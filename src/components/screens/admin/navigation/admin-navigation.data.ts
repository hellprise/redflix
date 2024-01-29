import { getAdminHomeUrl, getAdminUrl } from "@/config/url.config"

import { INavigationItem } from "./admin-navigation.interface"

export const adminNavItems: INavigationItem[] = [
	{
		title: "Statistics",
		slug: getAdminHomeUrl()
	},
	{
		title: "Users",
		slug: getAdminUrl("users")
	},
	{
		title: "Movies",
		slug: getAdminUrl("movies")
	},
	{
		title: "Actors",
		slug: getAdminUrl("actors")
	},
	{
		title: "Genres",
		slug: getAdminUrl("genres")
	}
]
