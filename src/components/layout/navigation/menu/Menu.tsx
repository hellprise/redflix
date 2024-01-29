import { MenuItem } from "./MenuItem"
import { AuthItems } from "./auth/AuthItems"
import { IMenu } from "./menu.interface"

export function Menu({ menu: { title, items } }: { menu: IMenu }) {
	return (
		<section className="st.menu mb-14 animate-fade">
			<h2 className="st.heading mb-6 text-sm font-semibold uppercase text-gray-500">
				{title}
			</h2>

			<nav>
				<ul className="st.ul flex flex-col gap-6">
					{items.map(item => (
						<MenuItem key={item.slug} item={item} />
					))}

					{title === "General" ? <AuthItems /> : null}
				</ul>
			</nav>
		</section>
	)
}
