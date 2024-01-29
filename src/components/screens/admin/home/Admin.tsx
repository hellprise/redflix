import { Heading } from "@/components/ui"

import { Statistics } from "./statistics/Statistics"

export function Admin() {
	return (
		<>
			<Heading title="Some statistics" className="xl mb-8" />

			<Statistics />
		</>
	)
}
