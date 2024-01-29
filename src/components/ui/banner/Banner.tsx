import Image from "next/image"
import { FC } from "react"

import st from "./Banner.module.scss"

interface IBanner {
	image: string
	Detail?: FC | null
}

export function Banner({ image, Detail }: IBanner) {
	return (
		<section className={st.banner}>
			<Image
				className="object-top image-like-bg"
				unoptimized
				priority
				draggable={false}
				src={image}
				alt="Banner"
				fill
			/>

			{Detail && <Detail />}
		</section>
	)
}
