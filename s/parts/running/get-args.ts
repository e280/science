
import {Options} from "../types.js"
import {themes} from "../presentation/themes.js"
import {getArg, getEnv, hasArg} from "../presentation/supports.js"

export const getArgs = (options: Partial<Options>) => ({
	verbose: options.verbose ?? (
		hasArg("--verbose") ||
		getArg("--verbose") === "1" ||
		hasArg("-v") ||
		getEnv("SCIENCE_VERBOSE") === "1"
	),

	theme: options.theme ?? (() => {
		const themeName = getArg("--theme") || getEnv("SCIENCE_THEME")
		if (themeName) {
			const theme = themes[themeName as keyof typeof themes]
			if (!theme)
				throw new Error(`theme not found "${themeName}"`)
			return theme
		}
		return themes.redgreen
	})(),
})

