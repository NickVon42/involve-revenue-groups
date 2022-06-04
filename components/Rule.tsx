import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import Parameter from "./Parameter"

interface Props {
	rule: number
	index: number
	handleRemove: () => void
}

const fields = ["afff_sub_1", "afff_sub_2", "afff_sub_3", "afff_sub_4"] as const
const operators = [
	"is",
	"is not",
	"starts with",
	"ends with",
	"contains",
	"doesn't contain",
	"doesn't start with",
	"doesn't end with",
] as const

const Rule = ({ rule, index, handleRemove }: Props) => {
	const { register, unregister } = useFormContext()
	const [paramlist, setParamList] = useState<number[]>([0])
	const nestedObjPrefix = `rules.${rule}`

	function handleAddOrRemoveParams(type: "add" | "remove", value: number) {
		switch (type) {
			case "add":
				setParamList((list) => [...list, list[list.length - 1] + 1])
				break
			case "remove":
				unregister(`${nestedObjPrefix}.parameters.${value}`)

				setParamList((list) => list.filter((item) => item !== value))
				break
		}
	}

	const renderParameter = (value: number, index: number) => {
		return (
			<Parameter
				key={value}
				nestedObjPrefix={nestedObjPrefix}
				value={value}
				index={index}
				handleAddOrRemove={(type) => handleAddOrRemoveParams(type, value)}
			/>
		)
	}

	return (
		<div className=" border  border-dashed rounded-md px-3 py-2 border-gray-300 h-1/3 mb-6 min-w-[800]">
			<div className="flex flex-row justify-between items-center">
				<p className="text-md text-gray-700 mb-2">Rule {index + 1}</p>
				<button
					onClick={(e) => {
						e.preventDefault()
						handleRemove()
					}}
				>
					<p className="text-md text-gray-700 mb-2">X</p>
				</button>
			</div>
			<div className=" bg-gray-100 rounded-md p-3 flex flex-row justify-evenly  ">
				<div className=" flex flex-row  w-full h-10 items-center mx-2 mb-6 ">
					<p className=" text-md text-gray-700 mr-3">if</p>
					<select
						defaultValue=""
						{...register(`${nestedObjPrefix}.field`)}
						className="block w-full h-11 mr-3 text-sm text-gray-700 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
					>
						<option value="">Select field</option>

						{fields.map((field) => (
							<option key={field} value={field}>
								{field}
							</option>
						))}
					</select>
					<select
						defaultValue=""
						{...register(`${nestedObjPrefix}.operator`)}
						className="block w-full mr-3 h-11 text-sm text-gray-700 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
					>
						<option value="">Select operator</option>
						{operators.map((operator) => (
							<option key={operator} value={operator}>
								{operator}
							</option>
						))}
					</select>
				</div>

				<div className="w-full">{paramlist.map(renderParameter)}</div>
			</div>
			<div className=" flex flex-row  items-center mt-3">
				<p className="  text-md text-gray-700 mr-3">then revenue is</p>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<p className=" text-xl text-gray-700">%</p>
					</div>
					<input
						required
						type="number"
						{...register(`${nestedObjPrefix}.revenue`, {
							valueAsNumber: true,
						})}
						className=" border border-gray-300  text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
						placeholder="Enter amount"
					/>
				</div>
			</div>
		</div>
	)
}

export default Rule
