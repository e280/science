
import {Fail} from "./errors.js"

export const makeExpectations = (a: any) => ({
	ok: () => !!a,
	available: () => a !== undefined && a !== null,
	nullish: () => a === undefined || a === null,
	happy: () => a !== undefined && a !== null,
	sad: () => a === undefined || a === null,
	is: (b: any) => a === b,
	isnt: (b: any) => a !== b,
	gt: (b: any) => a > b,
	gte: (b: any) => a >= b,
	lt: (b: any) => a < b,
	lte: (b: any) => a <= b,

	throws: (ErrorClass?: new(...a: any[]) => any) => {
		try {
			if (typeof a !== "function")
				throw new Fail(".throws() requires a function")
			a()
			return false
		}
		catch (error) {
			if (ErrorClass && !(error instanceof ErrorClass))
				return false
			return true
		}
	},

	throwsAsync: async(ErrorClass?: new(...params: any[]) => any) => {
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
			if (ErrorClass && !(error instanceof ErrorClass))
				return false
			return true
		}
	},
})

