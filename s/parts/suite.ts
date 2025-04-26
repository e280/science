
import {Tests} from "./types.js"
import {run} from "./runner/run.js"
import {emit} from "./report/emit.js"
import {report} from "./report/report.js"
import {Options} from "./report/types.js"

export async function suite(tests: Tests, options: Partial<Options> = {}) {
	const ran = await run(tests)
	const rep = report(ran, options)
	emit(rep)
}

