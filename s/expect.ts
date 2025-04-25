
export class Fail extends Error {
	name = this.constructor.name
}

function grace(condition: boolean, onFail: () => Fail) {
	if (!condition)
		throw onFail()
	return condition
}

const makeAssertions = (a: any) => ({
	is: (b: any) => a === b,
	isnt: (b: any) => a !== b,
	gt: (b: any) => grace(a > b, () => new Fail(`expect(${a}).gt(${b})`)),
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

const inverseAssertions = (a: any) => {
	const originals = makeAssertions(a)
	return Object.fromEntries(
		Object.entries(originals).map(([key, fn]) => {
			const fn1 = fn as (...p: any[]) => (boolean | Promise<boolean>)
			const fn2 = (...p: any[]) => {
				const result = fn1(...p)
				return (result instanceof Promise)
					? result.then(r => !r)
					: !result
			}
			return [key, fn2]
		})
	) as ReturnType<typeof makeAssertions>
}

function expectancy<A extends Record<string, (...p: any[]) => (boolean | Promise<boolean>)>>(
		assertions: A,
		message?: string,
	) {
	return Object.fromEntries(
		Object.entries(assertions).map(([key, fn]) => {
			const fn1 = fn as (...p: any[]) => (boolean | Promise<boolean>)
			const fn2 = (...p: any[]) => {
				const result = fn1(...p)
				if (result instanceof Promise) {
					return result.then(r => {
						if (!r) throw new Fail(message ?? `"${key}" expectation failed`)
						return r
					})
				}
				else {
					if (!result) throw new Fail(message ?? `"${key}" expectation failed`)
					return result
				}
			}
			return [key, fn2]
		})
	) as A
}

export const expect = (subject: any, message?: string) => ({
	...expectancy(makeAssertions(subject), message),
	not: expectancy(inverseAssertions(subject), message),
})

