// "use client"
import { ContentState, EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import { useEffect, useState } from "react"
import { Editor } from "react-draft-wysiwyg"

import { ITextEditor } from "./text-editor.interface"

export function TextEditor({
	onChange,
	value,
	placeholder,
	error,
	...props
}: ITextEditor) {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [isUpdated, setIsUpdated] = useState(false)

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true)
		setEditorState(editorState)

		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	}

	useEffect(() => {
		if (isUpdated) return

		const defaultValue = value || ""

		const blocksFromHTML = htmlToDraft(defaultValue)

		const contentState = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap
		)

		const newEditorState = EditorState.createWithContent(contentState)

		setEditorState(newEditorState)
	}, [isUpdated, value])

	return (
		<section className="relative mb-8 animate-fade border-0 border-b border-gray-600 text-left transition-colors focus-within:border-primary">
			<label className="block">
				<span className="block text-xs uppercase text-gray-600">
					{placeholder}
				</span>

				<div>
					<Editor
						toolbarClassName="text-editor-toolbar mt-4 rounded-t-lg mb-0 flex p-3 gap-3 items-center *:items-center *:gap-3 *:flex text-gray-500 bg-gray-600 bg-opacity-40"
						editorClassName="h-96 border border-b-0 border-gray-700 px-4 text-gray-500 overflow-hidden"
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						spellCheck
						toolbar={{
							// you can change any of these options to your liking
							// to see what options are available visit:
							// https://jpuri.github.io/react-draft-wysiwyg/#/docs
							options: ["inline", "list"],
							inline: {
								isDropdown: false,
								className: undefined,
								component: undefined,
								dropdownClassName: undefined,
								options: ["bold", "italic", "underline", "strikethrough"]
							},
							list: {
								inDropdown: false,
								options: ["unordered", "ordered"]
							}
						}}
						{...props}
					/>
				</div>

				{error && (
					<p className="absolute -bottom-6 left-0 w-full text-sm text-primary">
						{error.message}
					</p>
				)}
			</label>
		</section>
	)
}
