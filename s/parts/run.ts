
import {Options, Suite} from "./types.js"
import {getArgs} from "./running/get-args.js"
import {execute} from "./execution/execute.js"
import {deliver} from "./presentation/deliver.js"
import {summarize} from "./presentation/summarize.js"
import {considerColorSupport} from "./running/consider-color-support.js"

export async function run(tests: Suite, options: Partial<Options> = {}) {
	const {verbose, theme} = getArgs(options)
	const theme2 = considerColorSupport(theme)
	const report = await execute(tests)
	const summary = summarize(report, {verbose, theme: theme2})
	await deliver(summary)
}

