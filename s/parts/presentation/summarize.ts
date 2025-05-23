
import {Tube, Experiment} from "../types.js"
import {ms, plural} from "../execution/utils.js"
import {Execution} from "../execution/execute.js"
import {Summary, Options, Output, Stderr, Stdout} from "./types.js"

export function summarize(ex: Execution, options: Options): Summary {
	const {verbose, theme: {icons, colors}} = options

	const failures = [...ex.experiments.values()].filter(r => r.fail)
	const successes = [...ex.experiments.values()].filter(r => !r.fail)
	const allCount = ex.tubes.length
	const happyCount = successes.length
	const angryCount = failures.length
	const skipCount = ex.tubes.filter(t => t.skip).length
	const onlyCount = ex.tubes.filter(t => t.only).length

	const outputs: Output[] = []
	const log = (line: string) => outputs.push(new Stdout(line))
	const err = (line: string) => outputs.push(new Stderr(line))
	let loggedCaseCount = 0

	function pickIntro(tube: Tube, experiment: Experiment | undefined) {
		const suffix = tube.only
			? colors.only(` ${icons.only} [ONLY]`)
			: tube.skip
				? colors.skip(` ${icons.skip} [SKIP]`)
				: ""
		if (experiment && experiment.fail) return colors.errorLabel(icons.testFail) + suffix
		else if (experiment) return colors.successLabel(icons.testSuccess) + suffix
		else return colors.neutral(icons.testNeutral) + suffix
	}

	function errFailedTest(tube: Tube, experiment: Experiment) {
		loggedCaseCount += 1
		const path = tube.path
		const label = colors.errorLabel(tube.label)
		const breadcrumb = [...path.map(colors.errorPath), label].join(colors.errorGrammar(icons.pathSeparator))
		const message = colors.errorMessage(experiment.fail ?? "unknown fail")
		const timely = colors.errorTime(`${icons.timeSeparator}${ms(experiment.time)}`)
		const intro = pickIntro(tube, experiment)
		err(`${intro} ${breadcrumb}${colors.errorGrammar(icons.messageSeparator)}${message}${timely}`)
	}

	function logHappyTest(tube: Tube, experiment: Experiment) {
		loggedCaseCount += 1
		const path = tube.path
		const label = colors.successLabel(tube.label)
		const breadcrumb = [...path.map(colors.successPath), label].join(colors.successGrammar(icons.pathSeparator))
		const timely = colors.successTime(`${icons.timeSeparator}${ms(experiment.time)}`)
		const intro = pickIntro(tube, experiment)
		log(`${intro} ${breadcrumb}${timely}`)
	}

	function logLameTest(tube: Tube) {
		loggedCaseCount += 1
		const path = tube.path
		const label = colors.neutralLabel(tube.label)
		const breadcrumb = [...path.map(colors.neutral), label].join(colors.neutral(icons.pathSeparator))
		const intro = pickIntro(tube, undefined)
		log(`${intro} ${breadcrumb}`)
	}

	for (const tube of ex.tubes) {
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
		log(colors.only(`${icons.only} only ran ${onlyCount} test${plural(onlyCount)} (${ignored} ignored)`))
	}
	else if (skipCount) {
		log(colors.skip(`${icons.skip} skipped ${skipCount} test${plural(skipCount)}`))
	}

	if (angryCount === 0) {
		const x = colors.successSuite(icons.suiteSuccess)
		const happy = colors.successLabel(`${happyCount} happy tests`)
		const time = colors.successTime(`- ${ms(ex.time)}`)
		log(`${x} ${happy} ${time}`)
	}
	else {
		const x = colors.errorSuite(icons.suiteFail)
		const failures = colors.errorSuite(`${angryCount} failure${plural(angryCount)}`)
		const didnt = colors.errorDidnt(`(${happyCount} succeeded)`)
		const time = colors.errorTime(`- ${ms(ex.time)}`)
		err(`${x} ${failures} ${didnt} ${time}`)
	}

	return {
		execution: ex,
		outputs,
		code: angryCount > 0 ? 1 : 0,
	}
}

