"use client"

import { useQuery } from "@tanstack/react-query"

import { SkeletonLoader } from "@/components/ui"

import { AdminService } from "@/services/admin/admin.service"

interface ICountUsers {}

export function CountUsers({}: ICountUsers) {
	const { data: count, isLoading } = useQuery({
		queryKey: ["count users"],
		queryFn: async () => AdminService.getCountUsers(),
		select: ({ data }) => data
	})

	return isLoading ? (
		<SkeletonLoader count={1} height={320} className="" />
	) : (
		<section className="air-block flex h-80 items-center justify-center">
			<div className="flex flex-col items-center gap-y-0.5">
				<h3 className="text-6xl font-medium">{count}</h3>
				<p className="text-lg text-white/60">users</p>
			</div>
		</section>
	)
}
