export interface IVideoPlayer {
	videoSrc: string
	slug: string
}

// export interface IVideoElement extends ComponentProps<"video"> {
export interface IVideoElement extends HTMLVideoElement {
	msRequestFullscreen: () => void
	mozRequestFullScreen: () => void
	webkitRequestFullscreen: () => void
}
