
import {run} from "./runner/run.js"
import {defaultTheme} from "./theme.js"
import {ms, plural} from "./runner/utils.js"
import {ScienceOptions, Suite} from "./types.js"

export async function science<S extends Suite>(suite: S, options: Partial<ScienceOptions> = {}) {
	const theme = options.theme ?? defaultTheme()

	const r = await run(suite)
	const allCount = r.tests.all.size
	const happyCount = r.successes.length
	const angryCount = r.failures.length
	const skipCount = r.tests.skip.size
	const onlyCount = r.tests.only.size

	for (const failure of r.failures) {
		const path = failure.vial.path
		const label = theme.errorLabel(failure.vial.label)
		const breadcrumb = [...path.map(theme.errorPath), label].join(theme.errorGrammar(" -> "))
		const message = theme.errorMessage(failure.fail ?? "unknown fail")
		const time = theme.errorTime(`- ${ms(failure.time)}`)
		console.error(`🚫 ${breadcrumb} ${theme.errorGrammar("=>")} ${message} ${time}`)
	}

	if (angryCount > 0)
		console.log("")

	if (onlyCount) {
		const ignored = allCount - onlyCount
		console.log(`🚧 only running ${onlyCount} test${plural(onlyCount)} (ignoring ${ignored} test${plural(ignored)})`)
	}
	else if (skipCount) {
		console.log(`👻 skipping ${skipCount} test${plural(onlyCount)}`)
	}

	if (angryCount === 0) {
		console.log(`✅ ${happyCount} happy tests ${ms(r.time)}`)
		process.exit(0)
	}
	else {
		console.error(`❌ ${angryCount} failure${plural(angryCount)} - ${ms(r.time)}`)
		process.exit(1)
	}
}

