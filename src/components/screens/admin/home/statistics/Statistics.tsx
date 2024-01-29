import { CountUsers } from "./CountUsers"
import { PopularMovie } from "./PopularMovie"

interface IStatistics {}

export function Statistics({}: IStatistics) {
	return (
		<div className="grid grid-cols-2 gap-14 *:animate-fade">
			<CountUsers />

			<PopularMovie />
		</div>
	)
}
