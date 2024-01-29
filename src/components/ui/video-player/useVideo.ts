import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { IVideoElement } from "./player.interface"

export const useVideo = () => {
	const videoRef = useRef<IVideoElement | null>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const video = videoRef.current

		if (video?.duration) setVideoTime(video.duration)
	}, [videoRef.current?.duration])

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const toggleVideo = useCallback(() => {
		const video = videoRef.current

		if (!isPlaying) {
			video?.play()
			setIsPlaying(true)
		} else {
			video?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	const forward = () => {
		const video = videoRef.current

		if (video) {
			video.currentTime += 10
			setCurrentTime(video.currentTime)
		}
	}

	const revert = () => {
		const video = videoRef.current

		if (video) {
			video.currentTime -= 10
			setCurrentTime(video.currentTime)
		}
	}

	const fullScreen = () => {
		const video = videoRef.current

		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current

		if (!video) return

		const updateProgress = () => {
			setProgress((video.currentTime / video.duration) * 100)
			setCurrentTime(video.currentTime)
		}

		video.addEventListener("timeupdate", updateProgress)

		return () => video.removeEventListener("timeupdate", updateProgress)
	}, [videoTime])

	useEffect(() => {
		const video = videoRef.current

		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case " ": {
					event.preventDefault()
					toggleVideo()
					break
				}

				case "ArrowRight":
					forward()
					break

				case "ArrowLeft":
					revert()
					break

				case "f":
					fullScreen()
					break

				default:
					return
			}
		}

		document.addEventListener("keydown", handleKeyDown)

		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			actions: {
				toggleVideo,
				forward,
				revert,
				fullScreen
			},
			state: {
				isPlaying,
				currentTime,
				videoTime,
				progress
			}
		}),
		[currentTime, isPlaying, progress, toggleVideo, videoTime]
	)
}
