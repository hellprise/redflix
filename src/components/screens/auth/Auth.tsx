"use client"

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button, Heading } from "@/components/ui"

import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"

import { EAuthVariation } from "@/shared/types/auth.interface"

import { AuthFields } from "./AuthFields"
import { IAuthInput } from "./auth.interface"
import { useAuthRedirect } from "./useAuthRedirect"

export function Auth() {
	const [type, setType] = useState<EAuthVariation>(EAuthVariation.LOGIN)

	useAuthRedirect()

	const { isLoading } = useAuth()

	const { auth } = useActions()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({
		mode: "onChange"
	})

	// const login = (data: IAuthInput) => {
	// 	auth({
	// 		email: data.email,
	// 		password: data.password,
	// 		type: EAuthVariation.LOGIN
	// 	})
	// }
	// const register = (data: IAuthInput) => {
	// 	auth({
	// 		email: data.email,
	// 		password: data.password,
	// 		type: EAuthVariation.REGISTER
	// 	})
	// }

	const onSubmit: SubmitHandler<IAuthInput> = data => {
		// if (type === "login") login(data)
		// else register(data)
		auth({
			email: data.email,
			password: data.password,
			type
		})

		reset()
	}

	return (
		<section className="mt-32 flex flex-col items-center">
			<form
				className="air-block w-1/2 bg-opacity-80 p-7 text-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title="Auth" className="xl mb-6 tracking-wider" />

				<AuthFields
					register={registerInput}
					formState={formState}
					isPasswordRequired
				/>

				<div className="mx-auto mt-12 grid max-w-[78%] shadow-lg sm:grid-cols-2">
					<Button
						className="rounded-r-none"
						disabled={isLoading}
						type="submit"
						onClick={() => setType(EAuthVariation.LOGIN)}
					>
						Login
					</Button>

					<Button
						className="rounded-l-none bg-[#8f050b] opacity-80 transition-opacity duration-300 hover:opacity-100"
						disabled={isLoading}
						type="submit"
						onClick={() => setType(EAuthVariation.REGISTER)}
					>
						Register
					</Button>
				</div>
			</form>
		</section>
	)
}
