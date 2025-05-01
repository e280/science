
import {chunkify} from "./utils.js"
import {Fail} from "../expectation/errors.js"
import {display} from "../expectation/utils.js"
import {flattenTests} from "./flatten-tests.js"
import {workloadSize} from "./workload-size.js"
import {Suite, Tube, Experiment} from "../types.js"

export type Execution = Awaited<ReturnType<typeof execute>>

export async function execute(tree: Suite) {
	const tubes = flattenTests(tree)
	const nonSkipped = tubes.filter(tube => !tube.skip)
	const only = nonSkipped.filter(tube => tube.only)

	const selectedTubes = only.length > 0
		? only
		: nonSkipped

	type Execution = {
		tube: Tube
		experiment: Experiment
	}

	async function executeTube(tube: Tube): Promise<Execution> {
		const start = performance.now()
		return tube.fn()

			.then(result => {
				const time = performance.now() - start
				return {tube, experiment: {
					time,
					fail: (
						(result === undefined) ?
							undefined :

						(result === true) ?
							undefined :

						(result === false) ?
							"test returned false" :

						(typeof result === "string") ?
							result :
							"test returned unknown type"
					),
				}}
			})

			.catch(reason => {
				const time = performance.now() - start
				return {tube, experiment: {
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
				}}
			})
	}

	const totalStart = performance.now()
	const experiments = new Map<Tube, Experiment>()

	for (const workload of chunkify([...selectedTubes], workloadSize)) {
		const group = await Promise.all(workload.map(executeTube))
		for (const {tube, experiment} of group)
			experiments.set(tube, experiment)
	}

	const time = performance.now() - totalStart
	return {tubes, selectedTubes, experiments, time}
}

