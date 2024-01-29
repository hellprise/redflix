import { usePathname } from "next/navigation"

export const useActivePathname = (slug: string) => {
	const pathname = usePathname()

	return pathname === slug
}
