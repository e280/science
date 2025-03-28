
import {chunkify} from "./utils/chunkify.js"

export const meta = Symbol("meta")

export type TestMeta = {
	kind?: "only" | "skip"
	shouldFail?: boolean
}

export type Test = {
	(): Promise<void | boolean | string>
	[meta]?: TestMeta
}

export type Vial = {
	label: string
	fn: Test
	path: Suite[]
}

export type Suite = {[key: string]: Test | Suite}

export function test(fn: Test) {
	return fn
}

test.only = (fn: Test) => (fn[meta] = {kind: "only"}, fn)
test.skip = (fn: Test) => (fn[meta] = {kind: "skip"}, fn)
test.shouldFail = (fn: Test) => (fn[meta] = {shouldFail: true}, fn)

export function science<S extends Suite>(suite: S): S {
	return suite
}

export function flattenTests(suite: Suite) {
	const regular = new Set<Vial>()
	const only = new Set<Vial>()
	const skip = new Set<Vial>()

	function recurse(s: Suite, path: Suite[]) {
		path.push(s)
		for (const [label, value] of Object.entries(s)) {
			if (typeof value === "function") {
				const fn = value as Test
				const kind = fn[meta]?.kind
				const vial: Vial = {label, fn, path}

				switch (kind) {
					case "only":
						only.add(vial)
						break
					case "skip":
						skip.add(vial)
						break
					case undefined:
						regular.add(vial)
						break
				}
			}
			else recurse(value as Suite, path)
		}
	}

	recurse(suite, [])
	return {regular, only, skip}
}

export type Report = {
	vial: Vial
	time: number
	fail?: string
}

export async function run(suite: Suite) {
	const tests = flattenTests(suite)
	const selectedTests = tests.only.size > 0
		? tests.only
		: tests.regular

	const reports: Report[] = []

	function handleReport(vial: Vial, time: number, fail?: string) {
		const shouldFail = vial.fn[meta]?.shouldFail ?? false
		const augmentedFail = shouldFail
			? (fail ? undefined : "should have failed, but didn't")
			: fail

		if (augmentedFail === undefined)
			reports.push({vial, time})
		else
			reports.push({vial, time, fail: augmentedFail ?? "test failed"})
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

