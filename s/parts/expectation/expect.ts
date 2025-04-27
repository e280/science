
import {makeAssertions} from "./assertions.js"
import {expectancy, inverseAssertions} from "./utils.js"

export const expect = (a: any, message?: string) => ({
	...expectancy(false, a, makeAssertions(a), message),
	not: expectancy(true, a, inverseAssertions(a), message),
})

