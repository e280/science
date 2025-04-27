
import {themes} from "./themes.js"
import {glyphs} from "./glyphs.js"
import {ms, plural} from "../execution/utils.js"
import {ExecutionReport} from "../execution/execute.js"
import {Summary, Options, Output, Stderr, Stdout} from "./types.js"

export function summarize(
		report: ExecutionReport,
		options: Partial<Options> = {},
	): Summary {

	const t = options.theme ?? themes.standard
	const g = options.glyphs ?? glyphs.emoji

	const allCount = report.tests.all.size
	const happyCount = report.successes.length
	const angryCount = report.failures.length
	const skipCount = report.tests.skip.size
	const onlyCount = report.tests.only.size

	const outputs: Output[] = []
	const log = (line: string) => outputs.push(new Stdout(line))
	const err = (line: string) => outputs.push(new Stderr(line))

	for (const failure of report.failures) {
		const path = failure.vial.path
		const label = t.errorLabel(failure.vial.label)
		const breadcrumb = [...path.map(t.errorPath), label].join(t.errorGrammar(" -> "))
		const message = t.errorMessage(failure.fail ?? "unknown fail")
		const time = t.errorTime(`- ${ms(failure.time)}`)
		const x = t.errorSuite(g.testFail)
		err(`${x} ${breadcrumb} ${t.errorGrammar("=>")} ${message} ${time}`)
	}

	if (angryCount > 0)
		log("")

	if (onlyCount) {
		const ignored = allCount - onlyCount
		log(t.special(`${g.only} only running ${onlyCount} test${plural(onlyCount)} (${ignored} ignored)`))
	}
	else if (skipCount) {
		log(t.special(`${g.skip} skipping ${skipCount} test${plural(onlyCount)}`))
	}

	if (angryCount === 0) {
		const x = t.success(g.suiteSuccess)
		const happy = t.successLabel(`${happyCount} happy tests`)
		const time = t.successTime(`- ${ms(report.time)}`)
		log(`${x} ${happy} ${time}`)
	}
	else {
		const x = t.errorSuite(g.suiteFail)
		const failures = t.errorLabel(`${angryCount} failure${plural(angryCount)}`)
		const didnt = t.errorDidnt(`(${happyCount} succeeded)`)
		const time = t.errorTime(`- ${ms(report.time)}`)
		err(`${x} ${failures} ${didnt} ${time}`)
	}

	return {
		report,
		outputs,
		code: angryCount > 0 ? 1 : 0,
	}
}

