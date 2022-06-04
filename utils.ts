const removeNulls = (obj: any) => {
	const isArray = Array.isArray(obj)
	let k: any
	for (k of Object.keys(obj)) {
		if (obj[k] === null) {
			if (isArray) {
				obj.splice(k, 1)
			} else {
				delete obj[k]
			}
		} else if (typeof obj[k] === "object") {
			removeNulls(obj[k])
		}
		if (isArray && obj.length === k) {
			removeNulls(obj)
		}
	}
	return obj
}

export { removeNulls }
