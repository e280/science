
import {meta, Suite, Test, Vial} from "../types.js"

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

