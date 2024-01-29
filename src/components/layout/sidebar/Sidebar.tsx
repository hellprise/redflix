"use client"

import { MoviesContainer } from "./MoviesContainer/MoviesContainer"
import { Search } from "./search/Search"

interface ISidebar {}

export function Sidebar({}: ISidebar) {
	return (
		<aside className="fixed bottom-0 right-0 top-0 w-[21.5%] max-w-[350px] overflow-y-scroll border-l border-gray-800 p-11 no-scrollbar">
			<Search />
			<MoviesContainer />
		</aside>
	)
}
