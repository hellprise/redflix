import { MoviesContainer } from "@/components/layout/sidebar/MoviesContainer/MoviesContainer"

import { Search } from "./search/Search"

export function Sidebar() {
	return (
		<aside className="fixed bottom-0 right-0 top-0 w-[23%] max-w-[350px] overflow-y-scroll border-l border-gray-800 p-11 no-scrollbar">
			<Search />
			<MoviesContainer />
		</aside>
	)
}
