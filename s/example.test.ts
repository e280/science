
import Science from "./index.js"
import {test} from "./parts/test.js"
import {suite} from "./parts/tests.js"
import {expect} from "./parts/expectation/expect.js"

await Science.run({
	"addition works": test(async() => {
		expect(1 + 1).is(2)
	}),

	"subtraction works": test(async() => {
		expect(2 - 1).gt(0)
	}),

	"more tests": suite({
		"string tests": test(async() => {
			expect("hello" + " world").is("hello world")
		}),

		"array tests": test(async() => {
			const items = [1, 2, 3]
			items.pop()
			expect(items.length).not.is(3)
		}),
	}),
})

