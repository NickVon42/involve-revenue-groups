import type { NextPage } from "next"
import { useRecoilValue } from "recoil"
import Group from "../components/Group"
import { revenueGroups } from "../components/states"

const Browse: NextPage = () => {
	const revenueGroupList = useRecoilValue(revenueGroups)

	return (
		<div className="w-full p-10">
			<p className="text-2xl text-gray-800">Browse Revenue Group</p>
			{revenueGroupList?.length > 0 &&
				revenueGroupList.map((group, index) => (
					<Group key={index} group={group} />
				))}
		</div>
	)
}

export default Browse
