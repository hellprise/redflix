import { ComponentProps } from "react"
import { FieldError } from "react-hook-form"

export interface IFieldProps {
	error?: FieldError | undefined
}

type TInputPropsField = IFieldProps & ComponentProps<"input">

export interface IField extends TInputPropsField {}
