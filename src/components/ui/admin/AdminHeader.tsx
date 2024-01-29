import { ChangeEvent } from "react"

import { Button, Heading, SearchField } from "@/components/ui"

interface IAdminHeader {
	title: string
	onClick?: () => void
	searchTerm: string
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
	isLoading?: boolean
}

export function AdminHeader({
	title,
	searchTerm,
	isLoading,
	handleSearch,
	onClick
}: IAdminHeader) {
	return (
		<section className="">
			<Heading title={title} className="xl mb-10" />

			<div className="flex w-full items-center justify-between">
				<SearchField searchTerm={searchTerm} onChange={handleSearch} />

				{onClick && (
					<Button disabled={isLoading} onClick={onClick} size="md">
						Create new
					</Button>
				)}
			</div>
		</section>
	)
}
