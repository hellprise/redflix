import { EditorProps } from "react-draft-wysiwyg"

import { IFieldProps } from "@/components/ui/field/field.interface"

type TEditorPropsField = IFieldProps & EditorProps

export interface ITextEditor extends Omit<TEditorPropsField, "editorState"> {
	onChange: (...args: any[]) => void
	value: string
}
