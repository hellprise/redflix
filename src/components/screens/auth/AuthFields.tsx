import { FormState, UseFormRegister } from "react-hook-form"

import { Field } from "@/components/ui"

import { validEmail } from "@/shared/regex"

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

export function AuthFields({
	register,
	formState: { errors },
	isPasswordRequired = false
}: IAuthFields) {
	return (
		<>
			<Field
				{...register("email", {
					required: "Email is required",
					pattern: {
						value: validEmail,
						message: "Entered value does not match email format"
					}
				})}
				placeholder="E-mail"
				error={errors.email as any}
			/>

			<Field
				{...register(
					"password",
					isPasswordRequired
						? {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters"
								}
							}
						: {}
				)}
				placeholder="Password"
				type="password"
				error={errors.password as any}
			/>
		</>
	)
}
