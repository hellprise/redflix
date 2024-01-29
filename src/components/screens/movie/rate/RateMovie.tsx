"use client"

import { useEffect, useState } from "react"
import StarRating from "react-star-rating-component"

import { AuthButton } from "@/components/ui/video-player/auth/AuthButton"

import { useAuth } from "@/hooks/useAuth"

import { useRateMovie } from "./useRateMovie"

interface IRateMovie {
	id: string
	slug: string
}

export function RateMovie({ id, slug }: IRateMovie) {
	const [isMounted, setIsMounted] = useState(false)

	const { user } = useAuth()

	const { rating, isSended, handleClick } = useRateMovie(id)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<div className="air-block mx-auto my-10 w-1/2 p-7 text-center">
			<h3 className="text-2xl font-semibold">How do you like the movie?</h3>
			<p className="mb-3 mt-2 text-lg opacity-60">
				Rating improve recommendations
			</p>

			{user ? (
				<>
					{isSended ? (
						<p className="animate-scaleIn text-3xl font-semibold text-yellow-700">
							Thanks for your feedback!
						</p>
					) : (
						<StarRating
							// @ts-ignore
							className="animate-scaleIn space-x-0.5 text-3xl font-semibold text-yellow-700"
							name="star-rating"
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}
