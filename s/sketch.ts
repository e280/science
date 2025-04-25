
import {chunkify} from "./utils/chunkify.js"

export const meta = Symbol("meta")

export type Meta = {
	kind?: "only" | "skip"
}

export type Test = {
	(): Promise<void | boolean | string>
	[meta]?: Meta
}

export type Vial = {
	label: string
	fn: Test
	path: string[]
}

export type Suite = {
	[key: string]: Test | Suite
	[meta]?: Meta
}

export function test(fn: Test) {
	return fn
}

test.only = (fn: Test) => (fn[meta] = {kind: "only"}, fn)
test.skip = (fn: Test) => (fn[meta] = {kind: "skip"}, fn)

export function tests<S extends Suite>(suite: S): S {
	return suite
}

tests.only = <S extends Suite>(suite: S): S => (suite[meta] = {kind: "only"}, suite)
tests.skip = <S extends Suite>(suite: S): S => (suite[meta] = {kind: "skip"}, suite)

export function flattenTests(suite: Suite) {
	const all = new Set<Vial>()
	const regular = new Set<Vial>()
	const only = new Set<Vial>()
	const skip = new Set<Vial>()

	function recurse(s: Suite, path: string[]) {
		for (const [label, value] of Object.entries(s)) {
			if (typeof value === "function") {
				const fn = value as Test
				const kind = fn[meta]?.kind ?? s[meta]?.kind
				const vial: Vial = {label, fn, path}

				all.add(vial)

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
			else {
				const childSuite = value as Suite
				childSuite[meta] ??= s[meta]
				recurse(value as Suite, [...path, label])
			}
		}
	}

	recurse(suite, [])
	return {all, regular, only, skip}
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

function plural(x: number, one = "", many = "s") {
	return (x === 1) ? one : many
}

const ms = (t: number) => `(${t.toFixed(0)} ms)`

export async function science<S extends Suite>(suite: S) {
	const r = await run(suite)
	const allCount = r.tests.all.size
	const happyCount = r.successes.length
	const angryCount = r.failures.length
	const skipCount = r.tests.skip.size
	const onlyCount = r.tests.only.size

	for (const failure of r.failures) {
		const path = failure.vial.path
		const breadcrumb = [...path, failure.vial.label].join(" -> ")
		console.error(`🚫 ${breadcrumb} => ${failure.fail ?? "unknown fail"} ${ms(failure.time)}`)
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
		console.error(`❌ ${angryCount} failure${plural(angryCount)} ${ms(r.time)}`)
		process.exit(1)
	}
}





















