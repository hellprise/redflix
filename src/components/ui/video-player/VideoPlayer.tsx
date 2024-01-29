"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"

import { MaterialIcon } from "@/components/ui"
import { useVideo } from "@/components/ui/video-player/useVideo"

import { useAuth } from "@/hooks/useAuth"

import st from "./VideoPlayer.module.scss"
import { AuthPlaceholder } from "./auth/AuthPlaceholder"
import { IVideoPlayer } from "./player.interface"

export function VideoPlayer({ videoSrc, slug }: IVideoPlayer) {
	const [isMounted, setIsMounted] = useState(false)

	const { user } = useAuth()

	const { videoRef, state, actions } = useVideo()

	useEffect(() => {
		setIsMounted(true)

		return () => setIsMounted(false)
	}, [])

	return (
		isMounted && (
			<section className={clsx(st.wrapper, { "h-96": !user })}>
				{!user ? (
					<AuthPlaceholder slug={slug} />
				) : (
					<>
						<video
							ref={videoRef}
							// src={videoSrc}
							src={`${videoSrc}#t=8`} // we can use this to start video from 8th second
							className={st.video}
							// controls
							preload={"metadata"}
						/>

						<div className={st.progressBarContainer}>
							<section
								className={st.progressBar}
								style={{ width: `${state.progress}%` }}
							/>
						</div>

						<div className={st.controls}>
							<section>
								<button onClick={actions.revert}>
									<MaterialIcon name="MdHistory" />
								</button>

								<button onClick={actions.toggleVideo}>
									<MaterialIcon
										name={state.isPlaying ? "MdPause" : "MdPlayArrow"}
									/>
								</button>

								<button onClick={actions.forward}>
									<MaterialIcon name="MdUpdate" />
								</button>

								<div className={st.timeControls}>
									<p className={st.controlsTime}>
										{Math.floor(state.currentTime / 60) +
											":" +
											("0" + Math.floor(state.currentTime % 60)).slice(-2)}
									</p>
									<p>/</p>
									<p className={st.controlsTime}>
										{Math.floor(state.videoTime / 60) +
											":" +
											("0" + Math.floor(state.videoTime % 60)).slice(-2)}
									</p>
								</div>
							</section>

							<section>
								<button onClick={actions.fullScreen}>
									<MaterialIcon name="MdFullscreen" />
								</button>
							</section>
						</div>
					</>
				)}
			</section>
		)
	)
}
