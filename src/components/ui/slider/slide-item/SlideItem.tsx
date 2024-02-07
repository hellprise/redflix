import Image from "next/image"
import { useRouter } from "next/navigation"

import st from "../Slider.module.scss"

import { ISlideItem } from "./slide-item.interface"

export function SlideItem({ slide, buttonTitle = "Watch" }: ISlideItem) {
	const { push } = useRouter()

	return (
		<section className={st.slide}>
			{slide.bigPoster && (
				<Image
					className={st.image}
					draggable={false}
					priority
					quality={40}
					src={slide.bigPoster}
					fill
					alt={slide.title}
				/>
			)}

			<div className={st.content}>
				<h2 className={st.heading}>{slide.title}</h2>

				<p className={st.subheading}>{slide.subtitle}</p>

				<button className={st.button} onClick={() => push(slide.slug)}>
					{buttonTitle}
				</button>
			</div>
		</section>
	)
}
