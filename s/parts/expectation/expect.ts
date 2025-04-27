
import {makeAssertions} from "./assertions.js"
import {expectancy, inverseAssertions} from "./utils.js"

export const expect = (a: any, note?: string) => ({
	...expectancy(false, a, makeAssertions(a), note),
	not: expectancy(true, a, inverseAssertions(a), note),

	note: (note2: string) => ({
		...expectancy(false, a, makeAssertions(a), note2),
		not: expectancy(true, a, inverseAssertions(a), note2),
	}),
})

