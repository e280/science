
import {Fail} from "./errors.js"

export const makeExpectations = (a: any) => ({
	ok: () => !!a,
	nullish: () => a === undefined || a === null,
	available: () => a !== undefined && a !== null,
	is: (b: any) => a === b,
	isnt: (b: any) => a !== b,
	gt: (b: any) => a > b,
	gte: (b: any) => a >= b,
	lt: (b: any) => a < b,
	lte: (b: any) => a <= b,

	throws: () => {
		try {
			if (typeof a !== "function")
				throw new Fail(".throws() requires a function")
			a()
			return false
		}
		catch (error) {
			return true
		}
	},

	throwsAsync: async() => {
		try {
			if (typeof a !== "function")
				throw new Fail(".throwsAsync() requires an async function")
			const promise = a()
			if (!(promise instanceof Promise))
				throw new Fail(".throwsAsync() requires an *async* function")
			await promise
			return false
		}
		catch (error) {
			return true
		}
	},
})

