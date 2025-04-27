
import {themes} from "./themes.js"
import {glyphs} from "./glyphs.js"
import {TestReport, Vial} from "../types.js"
import {ms, plural} from "../execution/utils.js"
import {hasArg, isColorSupported} from "./supports.js"
import {ExecutionReport} from "../execution/execute.js"
import {Summary, Options, Output, Stderr, Stdout} from "./types.js"

export function summarize(
		report: ExecutionReport,
		options: Partial<Options> = {},
	): Summary {

	const verbose = options.verbose ?? (hasArg("--verbose") || hasArg("-v"))
	const g = options.glyphs ?? glyphs.standard
	const t = options.theme ?? (
		isColorSupported()
			? themes.standard
			: themes.plain
	)

	const allCount = report.tests.all.size
	const happyCount = report.successes.length
	const angryCount = report.failures.length
	const skipCount = report.tests.skip.size
	const onlyCount = report.tests.only.size

	const outputs: Output[] = []
	const log = (line: string) => outputs.push(new Stdout(line))
	const err = (line: string) => outputs.push(new Stderr(line))
	let loggedCaseCount = 0

	function getSpecialNote(vial: Vial) {
		const isSkip = report.tests.skip.has(vial)
		const isOnly = report.tests.only.has(vial)
		return (
			isOnly ?
				` ${g.only} (only)` :
			isSkip ?
				` ${g.skip} (skip)` :
				""
		)
	}

	function errFailedTest({vial, time, fail}: TestReport) {
		loggedCaseCount += 1
		const path = vial.path
		const label = t.errorLabel(vial.label)
		const breadcrumb = [...path.map(t.errorPath), label].join(t.errorGrammar(g.pathSeparator))
		const message = t.errorMessage(fail ?? "unknown fail")
		const timely = t.errorTime(`${g.timeSeparator}${ms(time)}`)
		const x = t.errorSuite(g.testFail)
		err(`${x}${getSpecialNote(vial)} ${breadcrumb}${t.errorGrammar(g.messageSeparator)}${message}${timely}`)
	}

	function logHappyTest({vial, time}: TestReport) {
		loggedCaseCount += 1
		const path = vial.path
		const label = t.successLabel(vial.label)
		const breadcrumb = [...path.map(t.successPath), label].join(t.successGrammar(g.pathSeparator))
		const timely = t.successTime(`${g.timeSeparator}${ms(time)}`)
		const x = t.successSuite(g.testSuccess)
		log(`${x}${getSpecialNote(vial)} ${breadcrumb}${timely}`)
	}

	for (const test of report.reports) {
		if (test.fail) errFailedTest(test)
		else if (verbose) logHappyTest(test)
	}

	if (loggedCaseCount > 0)
		log("")

	if (onlyCount) {
		const ignored = allCount - onlyCount
		log(t.only(`${g.only} only running ${onlyCount} test${plural(onlyCount)} (${ignored} ignored)`))
	}
	else if (skipCount) {
		log(t.skip(`${g.skip} skipping ${skipCount} test${plural(onlyCount)}`))
	}

	if (angryCount === 0) {
		const x = t.successSuite(g.suiteSuccess)
		const happy = t.successLabel(`${happyCount} happy tests`)
		const time = t.successTime(`- ${ms(report.time)}`)
		log(`${x} ${happy} ${time}`)
	}
	else {
		const x = t.errorSuite(g.suiteFail)
		const failures = t.errorSuite(`${angryCount} failure${plural(angryCount)}`)
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

