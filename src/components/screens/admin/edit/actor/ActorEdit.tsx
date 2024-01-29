"use client"

import { Controller, useForm } from "react-hook-form"

import {
	Button,
	Field,
	Heading,
	SkeletonLoader,
	UploadField
} from "@/components/ui"
import { SlugField } from "@/components/ui/slug-field/SlugField"

import { IActorEditInput } from "@/shared/types/actor.interface"

import { generateSlug } from "@/utils/generateSlug"

import { useActorEdit } from "./useActorEdit"

export function ActorEdit({ id }: { id: string }) {
	const {
		setValue,
		getValues,
		handleSubmit,
		register,
		control,
		formState: { errors }
	} = useForm<IActorEditInput>({
		mode: "onChange"
	})

	const { onSubmit, isLoading } = useActorEdit(setValue, id)

	return (
		<>
			<Heading title="Edit actor" className="xl" />

			<form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} className="" />
				) : (
					<>
						<div className="flex flex-wrap items-center justify-between *:w-[48%]">
							<Field
								{...register("name", {
									required: "Name is required"
								})}
								placeholder="Name"
								error={errors.name}
							/>

							<SlugField
								register={register}
								generate={() => {
									setValue("slug", generateSlug(getValues("name")))
								}}
								error={errors.slug}
							/>

							<Controller
								control={control}
								name="photo"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									<UploadField
										onChange={onChange}
										placeholder="Photo"
										error={error}
										value={value}
										folder="actors"
									/>
								)}
								rules={{
									required: "Photo is required"
								}}
							/>
						</div>

						<Button size="md" className="mt-10">
							Update
						</Button>
					</>
				)}
			</form>
		</>
	)
}
