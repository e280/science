
import {chunkify} from "./utils.js"
import {Fail} from "../expect/errors.js"
import {flattenTests} from "./flatten-tests.js"
import {Suite, Vial, TestReport} from "../types.js"

export async function run(suite: Suite) {
	const tests = flattenTests(suite)
	const selectedTests = tests.only.size > 0
		? tests.only
		: tests.regular

	const reports: TestReport[] = []

	function handleReport(vial: Vial, time: number, fail?: string) {
		reports.push({vial, time, fail})
	}

	const totalStart = performance.now()

	for (const workload of chunkify([...selectedTests], 64)) {
		await Promise.all(
			workload.map(vial => {
				const start = performance.now()
				vial.fn()

					.then(result => {
						const time = performance.now() - start
						handleReport(vial, time, (
							(result === undefined) ?
								undefined :

							(result === false) ?
								"test returned false" :

							(typeof result === "string") ?
								result :
								"test returned unknown type"
						))
					})

					.catch(reason => {
						const time = performance.now() - start
						handleReport(vial, time, (
							(typeof reason === "string") ?
								reason :

							(reason instanceof Fail) ?
								reason.message :

							(reason instanceof Error) ?
								`${reason.name}: ${reason.message}` :
								"test threw unknown type"
						))
					})
			})
		)
	}

	const time = performance.now() - totalStart
	const failures = reports.filter(r => r.fail)
	const successes = reports.filter(r => !r.fail)
	return {tests, selectedTests, reports, failures, successes, time}
}

