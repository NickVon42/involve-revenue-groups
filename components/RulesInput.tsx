import Image from "next/image"
import React, { useImperativeHandle, useState } from "react"
import { useFormContext } from "react-hook-form"
import Rule from "./Rule"

export interface RulesInputRef {
	clearAllRules: () => void
}

const RulesInput = React.forwardRef<RulesInputRef, any>((_, ref) => {
	const { unregister } = useFormContext()
	const [ruleList, setRuleList] = useState<number[]>([0])
	const handleRemoveItem = (rule: number) => {
		setRuleList((list) => list.filter((item) => item !== rule))
		unregister(`rules.${rule}`)
	}

	useImperativeHandle(ref, () => ({
		clearAllRules: () => setRuleList([0]),
	}))

	return (
		<div>
			<div className="flex mt-10 justify-between items-center">
				<p className="text-xl text-gray-800">Rules</p>
				<button
					className=" bg-blue-50 flex flex-row justify-center items-center px-4 py-2 rounded-3xl mb-5"
					onClick={(event) => {
						event.preventDefault()
						setRuleList((r) => [...r, r[r.length - 1] + 1])
					}}
				>
					<Image src={"/add.svg"} width={20} height={20} />
					<p className="text-sm text-blue-700 ml-1">Add</p>
				</button>
			</div>
			{ruleList.map((value, index) => (
				<Rule
					key={value}
					rule={value}
					index={index}
					handleRemove={() => handleRemoveItem(value)}
				/>
			))}
		</div>
	)
})

export default RulesInput
