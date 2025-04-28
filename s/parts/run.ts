
import {Suite} from "./types.js"
import {execute} from "./execution/execute.js"
import {Options} from "./presentation/types.js"
import {deliver} from "./presentation/deliver.js"
import {summarize} from "./presentation/summarize.js"

export async function run(tests: Suite, options: Partial<Options> = {}) {
	const report = await execute(tests)
	const summary = summarize(report, options)
	await deliver(summary)
}

