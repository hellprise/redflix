export const generateSlug = (field: string) => {
	return field
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
}
