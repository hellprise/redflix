import Image from "next/image"
import { CSSProperties } from "react"
import { FieldError } from "react-hook-form"

import { SkeletonLoader } from "@/components/ui"
import { useUpload } from "@/components/ui/upload-field/useUpload"

interface IUploadField {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}

export function UploadField({
	folder,
	onChange,
	value,
	error,
	style,
	placeholder,
	isNoImage = false
}: IUploadField) {
	const { uploadFile, isLoading } = useUpload(onChange, folder)

	return (
		<section
			className="relative mb-8 animate-fade text-left transition-colors focus-within:border-primary"
			style={style}
		>
			<div className="flex">
				<label className="group mr-6 block">
					<span className="mb-4 block animate-fade text-xs uppercase text-gray-600">
						{placeholder}
					</span>

					<input
						className="block w-full text-sm text-gray-600 opacity-70 transition-opacity file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white group-hover:opacity-100"
						type="file"
						onChange={uploadFile}
					/>

					{error && (
						<p className="relative -bottom-3 w-full text-sm text-primary">
							{error.message}
						</p>
					)}
				</label>

				{!isNoImage && (
					<div className="relative h-24 w-24 shrink-0">
						{isLoading ? (
							<SkeletonLoader count={1} className="h-full w-full" />
						) : (
							value && (
								<Image
									className="rounded-md image-like-bg"
									src={value}
									alt=""
									fill
									unoptimized
								/>
							)
						)}
					</div>
				)}
			</div>
		</section>
	)
}
