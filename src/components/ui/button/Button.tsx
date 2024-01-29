import clsx from "clsx"

import { IButton } from "./button.interface"

export function Button({
	className,
	children,
	size = "full",
	...props
}: IButton) {
	return (
		<button
			className={clsx(
				"btn-primary animate-scaleIn disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-70 disabled:hover:opacity-70 disabled:focus:opacity-70 disabled:active:opacity-70",
				className,
				{
					"rounded-xl px-10 py-2": size === "sm",
					"rounded-xl px-14 py-3": size === "md",
					"w-full rounded-[10px] py-2.5 text-center": size === "full"
				}
			)}
			{...props}
		>
			{children}
		</button>
	)
}
