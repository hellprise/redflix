export const getStoreLocalStorage = (key: string) => {
	if (typeof localStorage === "undefined") return null

	const ls = localStorage.getItem(key)

	if (!ls) return null

	return JSON.parse(ls)
}
