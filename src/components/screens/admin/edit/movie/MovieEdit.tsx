"use client"

import { Controller, useForm } from "react-hook-form"

import {
	Button,
	Field,
	Heading,
	Select,
	SkeletonLoader,
	UploadField
} from "@/components/ui"
import { SlugField } from "@/components/ui/slug-field/SlugField"

import { IMovieEditInput } from "@/shared/types/movie.interface"

import { generateSlug } from "@/utils/generateSlug"

import { useAdminActors } from "./useAdminActors"
import { useAdminGenres } from "./useAdminGenres"
import { useMovieEdit } from "./useMovieEdit"

export function MovieEdit({ id }: { id: string }) {
	const {
		setValue,
		getValues,
		handleSubmit,
		register,
		control,
		formState: { errors }
	} = useForm<IMovieEditInput>({
		mode: "onChange"
	})

	const { onSubmit, isLoading } = useMovieEdit(setValue, id)

	const { isLoading: isGenresLoading, data: genres } = useAdminGenres()
	const { isLoading: isActorsLoading, data: actors } = useAdminActors()

	return (
		<>
			<Heading title="Edit movie" className="xl" />

			<form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} className="" />
				) : (
					<>
						<div className="flex flex-wrap items-center justify-between">
							<Field
								{...register("title", {
									required: "Title is required"
								})}
								placeholder="Name"
								error={errors.title}
								style={{ width: "48%" }}
							/>

							<div style={{ width: "48%" }}>
								<SlugField
									register={register}
									generate={() => {
										setValue("slug", generateSlug(getValues("title")))
									}}
									error={errors.slug}
								/>
							</div>
						</div>

						<div className="my-5 flex flex-wrap items-center justify-between">
							<Field
								{...register("parameters.country", {
									required: "Country is required"
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: "31%" }}
							/>

							<Field
								{...register("parameters.duration", {
									required: "Duration is required"
								})}
								placeholder="Duration (min.)"
								error={errors.parameters?.duration}
								style={{ width: "31%" }}
							/>

							<Field
								{...register("parameters.year", {
									required: "Year is required"
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: "31%" }}
							/>
						</div>

						<div className="my-5 flex flex-wrap items-center justify-between">
							<Controller
								control={control}
								name="genres"
								render={({ field, fieldState: { error } }) => (
									<Select
										options={genres || []}
										field={field}
										placeholder="Genres"
										error={error}
										isLoading={isGenresLoading}
										isMulti
										style={{ width: "48%" }}
									/>
								)}
								rules={{
									required: "Please select at least one genre!"
								}}
							/>

							<Controller
								control={control}
								name="actors"
								render={({ field, fieldState: { error } }) => (
									<Select
										options={actors || []}
										field={field}
										placeholder="Actors"
										error={error}
										isLoading={isActorsLoading}
										isMulti
										style={{ width: "48%" }}
									/>
								)}
								rules={{
									required: "Please select at least one actor!"
								}}
							/>
						</div>

						<div className="flex flex-wrap items-center justify-between">
							<Controller
								control={control}
								name="poster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => {
									return (
										<UploadField
											onChange={onChange}
											placeholder="Poster"
											error={error}
											value={value}
											folder="movies"
											style={{ width: "46%" }}
										/>
									)
								}}
								rules={{
									required: "Poster is required"
								}}
							/>

							<Controller
								control={control}
								name="bigPoster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => {
									return (
										<UploadField
											onChange={onChange}
											placeholder="Big Poster"
											error={error}
											value={value}
											folder="movies"
											style={{ width: "46%" }}
										/>
									)
								}}
								rules={{
									required: "Big Poster is required"
								}}
							/>
						</div>

						<Controller
							control={control}
							name="videoUrl"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => {
								return (
									<UploadField
										onChange={onChange}
										placeholder="Video"
										error={error}
										value={value}
										folder="movies"
										// style={{ marginTop: -25 }}
										isNoImage
									/>
								)
							}}
							rules={{
								required: "Video is required"
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
