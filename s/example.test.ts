
import Science from "./index.js"
import {test} from "./parts/test.js"
import {suite} from "./parts/tests.js"
import {expect} from "./parts/expectation/expect.js"

await Science.run({
	"addition works": test(async() => {
		expect(2 + 2).is(4)
	}),

	"multiplication works": test(async() => {
		expect(2 * 3).gt(5)
	}),

	"nested suite": suite({
		"strings work": test(async() => {
			expect("hello" + " world").is("hello world")
		}),

		"arrays work": test(async() => {
			expect([1, 2, 3].length).not.is(2)
		}),
	}),
})

