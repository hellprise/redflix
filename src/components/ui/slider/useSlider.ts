import { useState } from "react"

export const useSlider = (length: number) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [slideIn, setSlideIn] = useState(true)

	const isExistsNext = currentIndex < length - 1
	const isExistsPrev = currentIndex ? currentIndex - 1 < length : false

	const handleArrowClick = (direction: "next" | "prev") => {
		if (direction === "next") {
			setSlideIn(false)

			setTimeout(() => {
				setCurrentIndex(prev => prev + 1)
				setSlideIn(true)
			}, 300)
		} else {
			setSlideIn(false)

			setTimeout(() => {
				setCurrentIndex(prev => prev - 1)
				setSlideIn(true)
			}, 300)
		}
	}

	return {
		slideIn,
		index: currentIndex,
		isNext: isExistsNext,
		isPrev: isExistsPrev,
		handleClick: handleArrowClick
	}
}
