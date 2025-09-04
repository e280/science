
import {Options, Suite} from "./types.js"
import {execute} from "./execution/execute.js"
import {themes} from "./presentation/themes.js"
import {deliver} from "./presentation/deliver.js"
import {summarize} from "./presentation/summarize.js"
import {getArg, getEnv, hasArg, isColorSupported} from "./presentation/supports.js"

export async function run(tests: Suite, options: Partial<Options> = {}) {

	// receiving verbose option
	const verbose = options.verbose ?? (
		hasArg("--verbose") ||
		getArg("--verbose") === "1" ||
		hasArg("-v") ||
		getEnv("SCIENCE_VERBOSE") === "1"
	)

	// receiving theme option
	const theme = options.theme ?? (() => {
		const themeName = getArg("--theme") || getEnv("SCIENCE_THEME")
		if (themeName) {
			const theme = themes[themeName as keyof typeof themes]
			if (!theme)
				throw new Error(`theme not found "${themeName}"`)
			return theme
		}
		return themes.redgreen
	})()

	// removing ansi colors when support is not detected
	const theme2 = {
		...theme,
		colors: isColorSupported()
			? theme.colors
			: themes.plain.colors
	}

	const report = await execute(tests)
	const summary = summarize(report, {verbose, theme: theme2})
	await deliver(summary)
}

