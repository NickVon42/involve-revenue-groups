import Image from "next/image"
import React from "react"
import { useSetRecoilState } from "recoil"
import { revenueGroups } from "./states"

interface Props {
	group: RevenueGroup
}

const Group = ({ group }: Props) => {
	const setRevenueGroups = useSetRecoilState(revenueGroups)

	const maxPossibleParams: number = Math.max(
		...group.rules.reduce<number[]>(
			(acc, cur) => [...acc, cur.parameters.length],
			[]
		)
	)

	function deleteGroup() {
		setRevenueGroups((existingRevGroups) =>
			existingRevGroups.filter((item) => item.name !== group.name)
		)
	}

	function deleteRule(ruleAtIndex: number) {
		setRevenueGroups((existingRevGroups) =>
			existingRevGroups.map((item) => {
				if (item.name !== group.name) return item
				const newRules = [...item.rules]
				newRules.splice(ruleAtIndex, 1)
				return { ...item, rules: newRules }
			})
		)
	}

	return (
		<div className="border border-gray-300   my-10 rounded-lg min-w-min">
			<div className="flex flex-row justify-between items-center mx-5 mt-5 mb-3 ">
				<div className="flex flex-row items-center">
					<p className="text-lg">{group.name}</p>
					{group.special && (
						<p className="ml-2 rounded-2xl bg-blue-600 px-2 py-1  text-xs text-white h-6">
							Special Group
						</p>
					)}
				</div>
				<button
					onClick={() => deleteGroup()}
					className=" rounded-full w-10 h-10 items-center justify-center bg-gray-100 flex"
				>
					<Image
						src="/Iconsdelete.svg"
						alt="delete"
						height={23}
						width={23}
					/>
				</button>
			</div>
			<p className="text-sm mx-5 text-gray-600 w-4/6 mb-8">
				{group.description}
			</p>
			<div className="relative overflow-x-auto  max-h-96 overflow-scroll  border-t border-gray-300">
				<table className="w-full text-sm text-left  ">
					<thead className="text-md text-gray-700  bg-white ">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 font-normal text-gray-500"
							>
								Rule
							</th>
							<th
								scope="col"
								className="px-6 py-3 font-normal text-gray-500"
							>
								Field
							</th>
							<th
								scope="col"
								className="px-6 py-3 font-normal text-gray-500"
							>
								Operator
							</th>
							{Array.from({ length: maxPossibleParams }).map(
								(_, index) => (
									<th
										key={index}
										scope="col"
										className="px-6 py-3 font-normal text-gray-500"
									>
										Parameter {index + 1}
									</th>
								)
							)}

							<th
								scope="col"
								className="px-6 py-3 font-normal text-gray-500"
							>
								Revenue
							</th>
							<th
								scope="col"
								className="px-6 py-3 font-normal text-gray-500"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{group.rules.map((rule, index) => (
							<tr
								key={index}
								className="border-y border-gray-100  even:bg-white odd:bg-gray-50 "
							>
								<td className="px-6 py-4">{index + 1}</td>
								<td className="px-6 py-4">{rule.field}</td>
								<td className="px-6 py-4">{rule.operator}</td>
								{Array.from({ length: maxPossibleParams }).map(
									(_, index) => (
										<td key={index} className="px-6 py-3">
											{rule.parameters[index]}
										</td>
									)
								)}
								<td className="px-6 py-4">{rule.revenue}%</td>

								<td className="px-6 py-4 text-left">
									<button
										onClick={() => deleteRule(index)}
										className=" opacity-30"
									>
										<Image
											alt="delete"
											src="/Iconsdelete.svg"
											height={21}
											width={21}
										/>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Group
