
import {themes} from "./themes.js"
import {glyphs} from "./glyphs.js"
import {Tube, Experiment} from "../types.js"
import {ms, plural} from "../execution/utils.js"
import {hasArg, isColorSupported} from "./supports.js"
import {ExecutionReport} from "../execution/execute.js"
import {Summary, Options, Output, Stderr, Stdout} from "./types.js"

export function summarize(
		ex: ExecutionReport,
		options: Partial<Options> = {},
	): Summary {

	const verbose = options.verbose ?? (hasArg("--verbose") || hasArg("-v"))
	const g = options.glyphs ?? glyphs.seaside
	const t = options.theme ?? (
		isColorSupported()
			? themes.seaside
			: themes.plain
	)

	const allCount = ex.tests.length
	const happyCount = ex.successes.length
	const angryCount = ex.failures.length
	const skipCount = ex.tests.filter(t => t.skip).length
	const onlyCount = ex.tests.filter(t => t.only).length

	const outputs: Output[] = []
	const log = (line: string) => outputs.push(new Stdout(line))
	const err = (line: string) => outputs.push(new Stderr(line))
	let loggedCaseCount = 0

	function pickIntro(tube: Tube, experiment: Experiment | undefined) {
		const suffix = tube.only
			? t.only(` ${g.only} [ONLY]`)
			: tube.skip
				? t.skip(` ${g.skip} [SKIP]`)
				: ""
		if (experiment && experiment.fail) return t.errorSuite(g.testFail) + suffix
		else if (experiment) return t.successSuite(g.testSuccess) + suffix
		else return t.neutral(g.testNeutral) + suffix
	}

	function errFailedTest(tube: Tube, experiment: Experiment) {
		loggedCaseCount += 1
		const path = tube.path
		const label = t.errorLabel(tube.label)
		const breadcrumb = [...path.map(t.errorPath), label].join(t.errorGrammar(g.pathSeparator))
		const message = t.errorMessage(experiment.fail ?? "unknown fail")
		const timely = t.errorTime(`${g.timeSeparator}${ms(experiment.time)}`)
		const intro = pickIntro(tube, experiment)
		err(`${intro} ${breadcrumb}${t.errorGrammar(g.messageSeparator)}${message}${timely}`)
	}

	function logHappyTest(tube: Tube, experiment: Experiment) {
		loggedCaseCount += 1
		const path = tube.path
		const label = t.successLabel(tube.label)
		const breadcrumb = [...path.map(t.successPath), label].join(t.successGrammar(g.pathSeparator))
		const timely = t.successTime(`${g.timeSeparator}${ms(experiment.time)}`)
		const intro = pickIntro(tube, experiment)
		log(`${intro} ${breadcrumb}${timely}`)
	}

	function logLameTest(tube: Tube) {
		loggedCaseCount += 1
		const path = tube.path
		const label = t.neutralLabel(tube.label)
		const breadcrumb = [...path.map(t.neutral), label].join(t.neutral(g.pathSeparator))
		const intro = pickIntro(tube, undefined)
		log(`${intro} ${breadcrumb}`)
	}

	for (const tube of ex.tests) {
		const experiment = ex.experiments.get(tube)
		if (experiment) {
			if (experiment.fail) errFailedTest(tube, experiment)
			else if (verbose) logHappyTest(tube, experiment)
		}
		else if (verbose) {
			logLameTest(tube)
		}
	}

	if (loggedCaseCount > 0)
		log("")

	if (onlyCount) {
		const ignored = allCount - onlyCount
		log(t.only(`${g.only} only ran ${onlyCount} test${plural(onlyCount)} (${ignored} ignored)`))
	}
	else if (skipCount) {
		log(t.skip(`${g.skip} skipped ${skipCount} test${plural(skipCount)}`))
	}

	if (angryCount === 0) {
		const x = t.successSuite(g.suiteSuccess)
		const happy = t.successLabel(`${happyCount} happy tests`)
		const time = t.successTime(`- ${ms(ex.time)}`)
		log(`${x} ${happy} ${time}`)
	}
	else {
		const x = t.errorSuite(g.suiteFail)
		const failures = t.errorSuite(`${angryCount} failure${plural(angryCount)}`)
		const didnt = t.errorDidnt(`(${happyCount} succeeded)`)
		const time = t.errorTime(`- ${ms(ex.time)}`)
		err(`${x} ${failures} ${didnt} ${time}`)
	}

	return {
		execution: ex,
		outputs,
		code: angryCount > 0 ? 1 : 0,
	}
}

