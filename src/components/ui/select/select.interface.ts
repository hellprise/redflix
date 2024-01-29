import { CSSProperties } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { Options } from "react-select"

import { IFieldProps } from "../field/field.interface"

export interface IOption {
	value: string
	label: string
}

export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	placeholder?: string
	style?: CSSProperties
}
