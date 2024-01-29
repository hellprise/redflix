import { ComponentProps } from "react"

export type TButtonSize = "sm" | "md" | "full"

export interface IButton extends ComponentProps<"button"> {
	size?: TButtonSize
}
