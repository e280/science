
import {meta, Test} from "./types.js"

export function test(fn: Test) {
	return fn
}

test.only = (fn: Test) => (fn[meta] = {kind: "only"}, fn)
test.skip = (fn: Test) => (fn[meta] = {kind: "skip"}, fn)

