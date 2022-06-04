import Image from "next/image"
import React from "react"
import { useFormContext } from "react-hook-form"

interface Props {
	nestedObjPrefix: string
	value: number
	index: number
	handleAddOrRemove: (type: "add" | "remove") => void
}

const Parameter = ({
	nestedObjPrefix,
	index,
	handleAddOrRemove,
	value,
}: Props) => {
	const { register } = useFormContext()

	return (
		<div className="flex flex-row w-full mb-2 items-center justify-center">
			<input
				{...register(`${nestedObjPrefix}.parameters.${value}`)}
				className=" border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-3"
				placeholder="Name"
			/>
			<button
				onClick={(e) => {
					e.preventDefault()
					index === 0
						? handleAddOrRemove("add")
						: handleAddOrRemove("remove")
				}}
			>
				<Image
					alt="add or remove"
					src={
						index === 0
							? "/add_circle_outline.svg"
							: "/remove_circle_outline.svg"
					}
					height={30}
					width={30}
				/>
			</button>
		</div>
	)
}

export default Parameter
