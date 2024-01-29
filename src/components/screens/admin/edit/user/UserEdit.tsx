"use client"

import { Controller, useForm } from "react-hook-form"

import { AuthFields } from "@/components/screens/auth/AuthFields"
import { Button, Heading, SkeletonLoader } from "@/components/ui"

import { IUserEditInput } from "@/shared/types/user.interface"

import { useUserEdit } from "./useUserEdit"

export function UserEdit({ id }: { id: string }) {
	const { setValue, getValues, handleSubmit, register, control, formState } =
		useForm<IUserEditInput>({
			mode: "onChange"
		})

	const { onSubmit, isLoading } = useUserEdit(setValue, id)

	return (
		<>
			<Heading title="Edit user" className="xl" />

			<form className="admin-form mt-12" onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} className="" />
				) : (
					<>
						<AuthFields register={register} formState={formState} />

						<Controller
							name="isAdmin"
							control={control}
							render={({ field }) => (
								<button
									onClick={e => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
								>
									{field.value ? "Make it regular user" : "Make it admin"}
								</button>
							)}
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
