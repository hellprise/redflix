import Link from "next/link"

import { MaterialIcon } from "@/components/ui"

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}

export function AdminActions({ editUrl, removeHandler }: IAdminActions) {
	return (
		<section className="flex items-center gap-4">
			<Link
				href={editUrl}
				className="bg-transparent text-xl text-primary opacity-80 transition-opacity hover:opacity-100"
			>
				<MaterialIcon name="MdEdit" />
			</Link>

			<button
				onClick={removeHandler}
				className="bg-transparent text-xl text-primary opacity-80 transition-opacity hover:opacity-100"
			>
				<MaterialIcon name="MdClose" />
			</button>
		</section>
	)
}
