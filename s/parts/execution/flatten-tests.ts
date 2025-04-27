
import {meta, Suite, Test, Tube} from "../types.js"

export function flattenTests(tree: Suite) {
	const tubes: Tube[] = []

	function recurse(s: Suite, path: string[]) {
		for (const [label, value] of Object.entries(s)) {
			if (typeof value === "function") {
				const fn = value as Test
				fn[meta] ??= s[meta] // fn inherits meta from parent suite
				tubes.push(new Tube(label, fn, path))
			}
			else {
				const childSuite = value as Suite
				childSuite[meta] ??= s[meta] // suite inherits meta from parent suite
				recurse(value as Suite, [...path, label])
			}
		}
	}

	recurse(tree, [])
	return tubes
}

