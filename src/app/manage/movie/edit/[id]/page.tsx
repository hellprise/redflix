import { MovieEdit } from "@/components/screens"

// export async function generateStaticParams() {
// 	return posts.map(post => ({
// 		slug: post.slug
// 	}))
// }

export default function ActorEditPage({
	params: { id }
}: {
	params: { id: string }
}) {
	// return <MovieEdit id={id} />
	return (
		<div>
			<h1>ActorEditPage</h1>
		</div>
	)
}
