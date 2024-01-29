import { FieldError, UseFormRegister } from "react-hook-form"

import { Field } from "@/components/ui"

interface ISlugField {
	error?: FieldError
	register: UseFormRegister<any>
	generate: () => void
}

export function SlugField({ register, generate, error }: ISlugField) {
	return (
		<section className="relative">
			<Field
				{...register("slug", {
					required: "Slug is required"
				})}
				placeholder="Slug"
				error={error}
			/>

			<button
				type="button"
				className="absolute right-3 top-6 rounded-lg border-gray-500 bg-gray-500 px-2 py-0.5 text-xs text-gray-800 transition-colors hover:bg-gray-300"
				onClick={generate}
			>
				Generate
			</button>
		</section>
	)
}
