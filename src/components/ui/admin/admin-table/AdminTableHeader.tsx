interface IAdminTableHeader {
	items: string[]
}

export function AdminTableHeader({ items }: IAdminTableHeader) {
	return (
		<section className="mt-8 flex animate-fade items-center justify-between rounded-lg bg-primary bg-opacity-20 px-5 shadow-lg transition-colors hover:bg-opacity-20">
			{items.map(value => (
				<span
					className="inline-block w-[26%] py-2.5 font-semibold text-white text-opacity-90 last:justify-end last:text-right"
					key={value}
				>
					{value}
				</span>
			))}

			<span className="inline-block font-semibold">Actions</span>
		</section>
	)
}
