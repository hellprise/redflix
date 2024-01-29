import clsx from "clsx"

import { Heading } from "@/components/ui"
import { Description } from "@/components/ui/description/Description"

import { CollectionItem } from "./CollectionItem"
import st from "./Collections.module.scss"
import { ICollection } from "./collections.interface"

interface ICollections {
	data: ICollection[]
}

export function Collections({ data }: ICollections) {
	return (
		<>
			<Heading title="Collections" className={clsx(st.heading, "xl")} />
			<Description
				className={st.description}
				text="In this section you will find all genres on our website"
			/>

			<section className={st.collections}>
				{data.map(collection => {
					return <CollectionItem key={collection._id} collection={collection} />
				})}
			</section>
		</>
	)
}
