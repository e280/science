#!/usr/bin/env node

import {test} from "./parts/test.js"
import {tests} from "./parts/tests.js"
import {expect} from "./parts/expect/expect.js"

import Science from "./index.js"

const steeze = {

	// // GOOD
	dollars: 1_000_001,
	seaworthyVessels: 2,
	bitches: 2,

	// // FAIL
	// dollars: 350,
	// seaworthyVessels: 0,
	// bitches: 0,
}

await Science.suite({
	"money stuff": tests({
		"not a brokie": test(async() => {
			expect(steeze.dollars).not.lt(1_000)
		}),

		"millionaire": test(async() => {
			expect(steeze.dollars, "poor!").gte(1_000_000)
		}),
	}),

	"boats": test(async() => {
		expect(steeze.seaworthyVessels).gt(1)
	}),

	"hoes": test(async() => {
		if (steeze.bitches < 2)
			throw "not enough bitches"
	}),
})

