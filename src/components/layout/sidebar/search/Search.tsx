import { SearchField } from "@/components/ui"

import { SearchList } from "./search-list/SearchList"
import { useSearch } from "./useSearch"

interface ISearch {}

export function Search({}: ISearch) {
	const { movies, isSuccess, searchTerm, handleSearch } = useSearch()
	return (
		<section className="relative mb-6">
			<SearchField onChange={handleSearch} searchTerm={searchTerm} />

			{isSuccess && <SearchList movies={movies || []} />}
		</section>
	)
}
