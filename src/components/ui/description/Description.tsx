"use client"

import clsx from "clsx"
import parse from "html-react-parser"
import { useEffect, useState } from "react"

interface IDescription {
	text: string
	className?: string
}

export function Description({ className, text }: IDescription) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		isMounted && (
			<div
				className={clsx(
					"animate-fade text-lg font-light text-white text-opacity-60",
					className
				)}
			>
				{parse(text)}
			</div>
		)
	)
}
