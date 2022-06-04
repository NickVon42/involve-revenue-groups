import { atom } from "recoil"

const revenueGroups = atom<RevenueGroup[]>({
	key: "RevenueGroups",
	default: [],
})

export { revenueGroups }
