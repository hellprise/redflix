import { AdminNavItem } from "./AdminNavItem"
import { adminNavItems } from "./admin-navigation.data"

export function AdminNavigation() {
	return (
		<nav className="air-block mx-auto mb-8 max-w-2xl animate-fade pt-4">
			<ul className="flex items-center justify-evenly">
				{adminNavItems.map(navItem => (
					<AdminNavItem item={navItem} key={navItem.slug} />
				))}
			</ul>
		</nav>
	)
}
