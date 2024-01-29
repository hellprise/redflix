import clsx from "clsx"
import Skeleton, { SkeletonProps } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function SkeletonLoader({ className, ...props }: SkeletonProps) {
	return (
		<Skeleton
			baseColor="#1f2125"
			highlightColor="#292a2e"
			className={clsx("!rounded-lg", className)}
			{...props}
		/>
	)
}
