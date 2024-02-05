import { ActorEdit } from "@/components/screens"

export default function ActorEditPage({
	params: { id }
}: {
	params: { id: string }
}) {
	return <ActorEdit id={id} />
}
