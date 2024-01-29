"use client"

import { Controller, useForm } from "react-hook-form"
import { stripHtml } from "string-strip-html"

import { Button, Field, Heading, SkeletonLoader } from "@/components/ui"
import { SlugField } from "@/components/ui/slug-field/SlugField"
import { TextEditor } from "@/components/ui/text-editor/TextEditor"

import { IGenreEditInput } from "@/shared/types/genre.interface"

import { generateSlug } from "@/utils/generateSlug"

import { useGenreEdit } from "./useGenreEdit"

export function GenreEdit({ id }: { id: string }) {
	const {
		setValue,
		getValues,
		handleSubmit,
		register,
		control,
		formState: { errors }
	} = useForm<IGenreEditInput>({
		mode: "onChange"
	})

	const { onSubmit, isLoading } = useGenreEdit(setValue, id)

	return (
		<>
			<Heading title="Edit genre" className="xl" />

			<form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} className="" />
				) : (
					<>
						<div className=">div-w-[48%] flex flex-wrap items-center justify-between">
							<Field
								{...register("name", {
									required: "Name is required"
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: "31%" }}
							/>

							<div style={{ width: "31%" }}>
								<SlugField
									register={register}
									generate={() => {
										setValue("slug", generateSlug(getValues("name")))
									}}
									error={errors.slug}
								/>
							</div>

							<Field
								{...register("icon", {
									required: "Icon is required"
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: "31%" }}
							/>
						</div>

						<Controller
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<TextEditor
									onChange={onChange}
									value={value}
									error={error}
									placeholder="Description"
								/>
							)}
							name="description"
							rules={{
								validate: {
									required: (value: string) =>
										(value && stripHtml(value).result.trim().length > 0) ||
										"Description is required"
								}
							}}
						/>

						<Button size="md" className="mt-10">
							Update
						</Button>
					</>
				)}
			</form>
		</>
	)
}
