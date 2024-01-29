import Image from "next/image"
import Link from "next/link"

import { MenuContainer } from "@/components/layout/navigation/menu/MenuContainer"

// import LogoImg from "@/assets/logo.svg"
import LogoImg from "@/assets/splash.png"

interface INavigation {}

export function Navigation({}: INavigation) {
	return (
		<section className="fixed bottom-0 left-0 top-0 w-1/5 max-w-[350px] overflow-y-scroll border-r border-gray-800 p-11 pr-0 no-scrollbar">
			<Link className="mb-7 block pr-11" href="/">
				<Image
					src={LogoImg}
					alt="movie streaming logotype"
					width={240}
					height={40}
					priority
					draggable={false}
				/>
			</Link>

			<MenuContainer />
		</section>
	)
}
