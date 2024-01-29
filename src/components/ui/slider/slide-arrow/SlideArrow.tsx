import clsx from "clsx"

import { MaterialIcon } from "@/components/ui"

interface ISlideArrow {
	variant: "left" | "right"
	clickHandler: () => void
}

export function SlideArrow({ variant, clickHandler }: ISlideArrow) {
	const isLeft = variant === "left"

	return (
		<button
			onClick={clickHandler}
			className={clsx(
				"absolute bottom-8 z-20 flex animate-fade items-center justify-center rounded-full bg-white bg-opacity-30 p-2 text-2xl text-white",
				{
					"right-24": isLeft,
					"right-8": !isLeft
				}
			)}
		>
			<MaterialIcon name={isLeft ? "MdChevronLeft" : "MdChevronRight"} />
		</button>
	)
}
