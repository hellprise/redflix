import { firstMenu, userMenu } from "@/shared/data/menu.data"

import { Menu } from "./Menu"
import { GenreMenu } from "./genres/GenreMenu"

export function MenuContainer() {
	return (
		<section>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<Menu menu={userMenu} />
		</section>
	)
}
