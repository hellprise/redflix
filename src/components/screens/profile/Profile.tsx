"use client"

import { useForm } from "react-hook-form"

import { AuthFields } from "@/components/screens/auth/AuthFields"
import { useProfile } from "@/components/screens/profile/useProfile"
import { Button, Heading, SkeletonLoader } from "@/components/ui"

import { IAuthFormData } from "@/shared/types/auth.interface"

export function Profile() {
	const { handleSubmit, register, formState, setValue } =
		useForm<IAuthFormData>({
			mode: "onChange"
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<form
			className="air-block w-1/2 bg-opacity-80 p-7 text-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			{isLoading ? (
				<SkeletonLoader count={3} />
			) : (
				<>
					<Heading title="Profile" className="xl mb-6 tracking-wider" />

					<AuthFields register={register} formState={formState} />

					<Button>Update profile</Button>
				</>
			)}
		</form>
	)
}

// .form {
//  @apply w-1/2 mt-12

//  > button {
//      @apply mt-5
//  }
// }
