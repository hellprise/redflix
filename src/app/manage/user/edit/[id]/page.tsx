import { UserEdit } from "@/components/screens/admin/edit/user/UserEdit"

// export async function generateStaticParams() {
// 	return posts.map(post => ({
// 		slug: post.slug
// 	}))
// }

export default function UserEditPage({
	params: { id }
}: {
	params: { id: string }
}) {
	// return <UserEdit id={id} />
	return (
		<div>
			<h1>UserEditPage</h1>
		</div>
	)
}
