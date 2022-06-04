import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import RulesInput, { RulesInputRef } from "../components/RulesInput"
import { revenueGroups } from "../components/states"
import { removeNulls } from "../utils"

const Home: NextPage = () => {
	const { ...methods } = useForm<RevenueGroup>()
	const { register, handleSubmit, reset } = methods
	const rulesInputRef = useRef<RulesInputRef>(null)
	const router = useRouter()
	const setRevenueGroups = useSetRecoilState(revenueGroups)

	const onSubmit = (data: RevenueGroup) => {
		setRevenueGroups((existingRevGroups) => [
			...existingRevGroups,
			removeNulls(data),
		])
		router.push("/browse")
	}

	const onClickReset = () => {
		reset()
		rulesInputRef.current?.clearAllRules()
	}

	return (
		<div className="border border-gray-300 p-5 m-10 rounded-lg min-w-min">
			<p className="text-2xl text-gray-700">Create Revenue Group</p>
			<FormProvider {...methods}>
				<form
					id="rev-group"
					className=" rounded pt-6 pb-8 mb-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Group Name
						</label>
						<input
							{...register("name")}
							className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="Name"
							required
						/>
						<label className="block text-gray-700 text-sm font-bold mb-2"></label>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Group Description
						</label>
						<textarea
							{...register("description")}
							rows={4}
							maxLength={200}
							className="block p-2.5 w-full text-sm text-gray-700  rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Add description"
						/>
					</div>
					<div className="flex items-center mb-4">
						<input
							{...register("special")}
							id="default-checkbox"
							type="checkbox"
							value=""
							className="w-4 h-4 text-blue-600  rounded border-gray-300 focus:ring-blue-500 "
						/>
						<label className="ml-2  text-sm font-medium text-gray-700 ">
							Special group
						</label>
					</div>
					<RulesInput ref={rulesInputRef} />
				</form>
			</FormProvider>
			<div className="flex justify-end">
				<button
					onClick={onClickReset}
					value="Reset"
					className="mr-3 border text-sm text-gray-700 border-gray-300 hover:text-blue-700 hover:border-blue-500  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Reset
				</button>
				<button
					type="submit"
					form="rev-group"
					value="Submit"
					className="bg-blue-500 hover:bg-blue-700 text-sm text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Submit
				</button>
			</div>
		</div>
	)
}

export default Home
