"use client"

import { OnChangeValue, default as ReactSelect } from "react-select"
import makeAnimated from "react-select/animated"

import { IOption, ISelect } from "./select.interface"

const animatedComponents = makeAnimated()

export function Select({
	placeholder,
	error,
	isMulti,
	options,
	field,
	isLoading,
	style
}: ISelect) {
	const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map(item => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter(option => field.value.indexOf(option.value) >= 0)
				: options.find(option => option.value === field.value)
		}

		return isMulti ? [] : ""
	}

	return (
		<section className="relative animate-fade" style={style}>
			<label className="block">
				<span className="mb-1 block text-xs uppercase text-gray-600">
					{placeholder}
				</span>

				<ReactSelect
					classNamePrefix="custom-select"
					options={options}
					value={getValue()}
					isMulti={isMulti}
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
				/>

				{error && (
					<p className="absolute -bottom-6 left-0 w-full text-sm text-primary">
						{error.message}
					</p>
				)}
			</label>
		</section>
	)
}
