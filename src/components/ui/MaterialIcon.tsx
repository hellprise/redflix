import * as MaterialIcons from "react-icons/md"

import { TMaterialIconName } from "@/shared/types/icons.types"

export function MaterialIcon({
	name,
	className
}: {
	name: TMaterialIconName
	className?: string
}) {
	const IconComponent = MaterialIcons[name]

	return (
		<IconComponent className={className} /> || (
			<IconComponent.MdDragIndicator className={className} />
		)
	)
}
