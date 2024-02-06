import { Collections } from "@/components/screens/collections/Collections"
import { ICollection } from "@/components/screens/collections/collections.interface"

import { API_URL, getGenresUrl } from "@/config/api.config"

async function getCollections() {
	const collectionsRes = await fetch(`${API_URL}${getGenresUrl(`collections`)}`)

	if (!collectionsRes.ok) {
		throw new Error("Failed to fetch genres collections")
	}

	const collections: ICollection[] = await collectionsRes.json()

	return {
		collections
	}
}

export default async function DiscoveryPage() {
	const { collections } = await getCollections()

	return <Collections data={collections || []} />
}
