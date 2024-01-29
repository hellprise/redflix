import { Heading, SkeletonLoader } from "@/components/ui"

import { AdminTableHeader } from "./AdminTableHeader"
import { AdminTableItem } from "./AdminTableItem"
import { ITableItem } from "./admin-table.interface"

interface IAdminTable {
	tableItems: ITableItem[]
	isLoading?: boolean
	headerItems: string[]
	removeHandler: (id: string) => void
}

export function AdminTable({
	tableItems,
	headerItems,
	isLoading,
	removeHandler
}: IAdminTable) {
	return (
		<section className="flex flex-col gap-3">
			<AdminTableHeader items={headerItems} />

			{isLoading ? (
				<SkeletonLoader count={1} height={48} />
			) : tableItems.length ? (
				tableItems.map(item => (
					<AdminTableItem
						tableItem={item}
						removeHandler={() => removeHandler(item._id)}
						key={item._id}
					/>
				))
			) : (
				<Heading title="Elements not found" />
			)}
		</section>
	)
}
