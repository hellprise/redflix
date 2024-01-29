import clsx from "clsx"

interface ISubHeading {
	title: string
	className?: string
}

export function SubHeading({ title, className }: ISubHeading) {
	return (
		<h3 className={clsx("text-xl font-semibold text-white", className)}>
			{title}
		</h3>
	)
}
