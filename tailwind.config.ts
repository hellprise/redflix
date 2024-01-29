import type { Config } from "tailwindcss"

const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

const primary = "#e30b13"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		colors: {
			primary,
			transparent: "transparent",
			black: colors.black,
			white: colors.white,
			yellow: {
				700: "#f5c521"
			},
			gray: {
				300: "#d9dae8",
				500: "#999aa5",
				600: "#66676e",
				700: "#39393f",
				800: "#242529",
				900: "#191b1f",
				950: "#101215"
			}
		},
		extend: {
			fontSize: {
				"2lg": "1.38rem"
			},
			transitionTimingFunction: {
				DEFAULT: "ease-in-out"
				// DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)"
			},
			transitionDelay: {
				DEFAULT: "200ms"
			},
			zIndex: {
				1: "1",
				2: "2",
				3: "3"
			},
			keyframes: {
				fade: {
					from: { opacity: "0" },
					to: { opacity: "1" }
				},
				scaleIn: {
					"0%": {
						opacity: "0",
						transform: "scale(0)"
					},
					"50%": {
						opacity: "0.3"
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)"
					}
				}
			},
			animation: {
				fade: "fade .5s ease-in-out",
				scaleIn: "scaleIn .35s ease-in-out"
			}
		}
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		plugin(({ addComponents, addUtilities, addBase, theme }: typeof plugin) => {
			addBase({
				input: {
					border: 0,
					outline: 0
				}
			})
			addComponents({
				".btn-primary": {
					backgroundColor: primary,
					color: theme("colors.white"),
					borderRadius: ".65rem",
					transition: "background-color 300ms ease-in-out",
					"&:hover": {
						backgroundColor: "#ff0009"
					}
				},
				".text-link": {
					textUnderlineOffset: 4,
					color: "rgba(255,255,255,0.9)",
					transition: "text-decoration-color 300ms ease-in-out",
					textDecorationLine: "underline",
					textDecorationColor: "rgba(255,255,255,0.2)",
					"&:hover": {
						textDecorationColor: "rgba(255,255,255,0.9)"
					}
				},
				".air-block": {
					borderRadius: theme("borderRadius.xl"),
					backgroundColor: theme("colors.gray.950"),
					color: theme("colors.white"),
					boxShadow: theme("boxShadow.lg")
				}
			})
			addUtilities({
				".text-shadow": {
					textShadow: "1px 1px rgba(0,0,0,0.4)"
				},
				".outline-border-none": {
					outline: "none",
					border: "none"
				},
				".no-scrollbar": {
					"&::-webkit-scrollbar": {
						display: "none"
					}
				},
				".flex-center-between": {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				},
				".image-like-bg": {
					objectPosition: "center",
					objectFit: "cover",
					pointerEvents: "none"
				}
			})
		})
	]
}
export default config
