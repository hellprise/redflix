import clsx from "clsx"
import { ComponentProps } from "react"

import { MaterialIcon } from "@/components/ui"

interface ISearchField {
	searchTerm: string
	onChange: ComponentProps<"input">["onChange"]
	className?: string
}

export function SearchField({ className, searchTerm, onChange }: ISearchField) {
	return (
		<section
			className={clsx(
				"flex max-w-[265px] items-center rounded-3xl border border-gray-700 px-3 py-1 transition-colors focus-within:border-gray-600",
				className
			)}
		>
			<MaterialIcon
				name="MdSearch"
				className="fill-gray-600 text-3xl transition-colors focus-within:fill-gray-500"
				// TODO: fix focus-within icon on input focus (doesn't work)
			/>

			<input
				className="block w-full bg-transparent text-white placeholder:text-gray-600"
				placeholder="Search"
				value={searchTerm}
				onChange={onChange}
			/>
		</section>
	)
}
