import clsx from "clsx"
import { forwardRef } from "react"

import { IField } from "./field.interface"

export const Field = forwardRef<HTMLInputElement, IField>(
	({ className, placeholder, style, error, type = "text", ...props }, ref) => {
		return (
			<section
				className={clsx(
					"relative mb-8 animate-fade border-b border-gray-600 text-left transition-colors focus-within:border-primary",
					className
				)}
				style={style}
			>
				<label className="block">
					<span className="block text-xs uppercase text-gray-600">
						{placeholder}
					</span>

					<input
						className="w-full bg-transparent px-0 text-gray-500 focus:ring-0"
						ref={ref}
						type={type}
						{...props}
					/>
				</label>

				{error && (
					<p className="absolute -bottom-6 left-0 w-full text-sm text-primary">
						{error.message}
					</p>
				)}
			</section>
		)
	}
)

Field.displayName = "Field"
