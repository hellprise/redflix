import clsx from "clsx"

interface IHeading {
	title: string
	className?: string
}

export function Heading({ className, title }: IHeading) {
	return (
		<h1
			className={clsx(
				"animate-fade font-semibold text-white text-opacity-80",
				className,
				{
					"text-3xl": className?.includes("xl")
				}
			)}
		>
			{title}
		</h1>
	)
}
