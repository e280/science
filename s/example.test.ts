#!/usr/bin/env node

import {expect} from "./expect.js"
import {science, test, tests} from "./sketch.js"

const steeze = {
	dollars: 350,
	seaworthyVessels: 0,
	bitches: 0,

	// dollars: 1_000_001,
	// seaworthyVessels: 2,
	// bitches: 2,
}

export default science({
	"money issues": tests({
		"i'm not a brokie": test(async() => {
			expect(steeze.dollars).not.lt(1_000)
		}),

		"i'm a millionaire": test(async() => {
			expect(steeze.dollars).gte(1_000_000)
		}),
	}),

	"i've got boats": test(async() => {
		expect(steeze.seaworthyVessels).gt(1)
	}),

	"i've got hoes": test(async() => {
		expect(steeze.bitches).gt(1)
	}),
})

