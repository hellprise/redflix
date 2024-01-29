"use client"

import { CSSTransition } from "react-transition-group"

import { SlideArrow } from "@/components/ui/slider/slide-arrow/SlideArrow"
import { SlideItem } from "@/components/ui/slider/slide-item/SlideItem"
import { useSlider } from "@/components/ui/slider/useSlider"

import st from "./Slider.module.scss"
import { ISlide } from "./slider.interface"

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}

export function Slider({ slides, buttonTitle }: ISlider) {
	const { index, isNext, isPrev, slideIn, handleClick } = useSlider(
		slides.length
	)

	return (
		<section className={st.slider}>
			<CSSTransition
				in={slideIn}
				timeout={300}
				classNames="slide-animation"
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>

			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleClick("prev")} />
			)}
			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleClick("next")} />
			)}
		</section>
	)
}
