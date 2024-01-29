import { GenreEdit } from "@/components/screens"

// export async function generateStaticParams() {
// 	return posts.map(post => ({
// 		slug: post.slug
// 	}))
// }

export default function GenreEditPage({
	params: { id }
}: {
	params: { id: string }
}) {
	return <GenreEdit id={id} />
}
