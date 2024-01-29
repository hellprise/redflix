import { AdminActions } from "./actions/AdminActions"
import { IAdminTableItem } from "./admin-table.interface"

export function AdminTableItem({ tableItem, removeHandler }: IAdminTableItem) {
	return (
		<section className="flex animate-fade items-center justify-between rounded-lg bg-gray-700 bg-opacity-20 px-5 transition-colors hover:bg-opacity-50">
			{tableItem.items.map(value => (
				<span
					className="inline-block w-[26%] py-3 text-white text-opacity-80 last:justify-end last:text-right"
					key={value}
				>
					{value}
				</span>
			))}

			<AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
		</section>
	)
}
