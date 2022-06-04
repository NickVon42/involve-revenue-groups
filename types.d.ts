interface Rule {
	field: string
	operator: string
	parameters: string[]
	revenue: number
}

interface RevenueGroup {
	name: string
	description: string
	special: boolean
	rules: Rule[]
}
