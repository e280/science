
import {expect} from "./expect.js"
import {science, test} from "./sketch.js"

const steeze = {
	dollars: 1_000_001,
	seaworthyVessels: 2,
	bitches: 2,
}

export default science({
	"i'm not a brokie": test(async() => {
		expect(steeze.dollars).not.lessThan(1_000)
	}),

	"i'm a millionaire": test(async() => {
		expect(steeze.dollars).gte(1_000_000)
	}),

	"i've got boats": test.only(async() => {
		expect(steeze.seaworthyVessels).greaterThan(1)
	}),

	"i've got hoes": test.skip(async() => {
		expect(steeze.bitches).greaterThan(1)
	}),
})

