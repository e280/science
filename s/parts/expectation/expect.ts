
import {makeExpectations} from "./expectations.js"
import {expectancy, inverseExpectations} from "./utils.js"

export const expect = (a: any, note?: string) => ({
	...expectancy(false, a, makeExpectations(a), note),
	not: expectancy(true, a, inverseExpectations(a), note),

	note: (note2: string) => ({
		...expectancy(false, a, makeExpectations(a), note2),
		not: expectancy(true, a, inverseExpectations(a), note2),
	}),
})

