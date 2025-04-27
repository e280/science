
import {chunkify} from "./utils.js"
import {Fail} from "../expectation/errors.js"
import {display} from "../expectation/utils.js"
import {flattenTests} from "./flatten-tests.js"
import {Suite, Vial, TestReport} from "../types.js"
import { workloadSize } from "./workload-size.js"

export type ExecutionReport = Awaited<ReturnType<typeof execute>>

export async function execute(tree: Suite) {
	const tests = flattenTests(tree)
	const selectedTests = tests.only.size > 0
		? tests.only
		: tests.regular

	async function executeVial(vial: Vial): Promise<TestReport> {
		const start = performance.now()
		return vial.fn()

			.then(result => {
				const time = performance.now() - start
				return {
					vial,
					time,
					fail: (
						(result === undefined) ?
							undefined :

						(result === false) ?
							"test returned false" :

						(typeof result === "string") ?
							result :
							"test returned unknown type"
					),
				}
			})

			.catch(reason => {
				const time = performance.now() - start
				return {
					vial,
					time,
					fail: (
						(typeof reason === "string") ?
							reason :

						(reason instanceof Fail) ?
							reason.message :

						(reason instanceof Error) ?
							`${reason.name}: ${reason.message}` :
							display(reason)
					),
				}
			})
	}

	const totalStart = performance.now()
	const reports: TestReport[] = []

	for (const workload of chunkify([...selectedTests], workloadSize)) {
		const workloadReport = await Promise.all(workload.map(executeVial))
		reports.push(...workloadReport)
	}

	const time = performance.now() - totalStart
	const failures = reports.filter(r => r.fail)
	const successes = reports.filter(r => !r.fail)
	return {tests, selectedTests, reports, failures, successes, time}
}

