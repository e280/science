
export class Fail extends Error {
	name = this.constructor.name
}

function trunc(s: string, max = 16) {
	return s.length > max
		? `${s.slice(max)}...`
		: s
}

function print(x: any) {
	if (typeof x === "undefined")
		return "undefined"
	else if (x === null)
		return "null"
	else if (typeof x === "string")
		return `"${trunc(x)}"`
	else if (typeof x === "number")
		return trunc(x.toString())
	else if (typeof x === "boolean")
		return x ? "true" : "false"
	else if (typeof x === "bigint")
		return trunc(x.toString())
	else if (typeof x === "symbol")
		return trunc(x.toString())
	else if (typeof x === "object")
		return "obj"
	else if (typeof x === "function")
		return "fn"
	else
		return "unknown"
}

const makeAssertions = (a: any) => ({
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

function prints(p: any[]) {
	return p.map(print).join(", ")
}

function expectmessage(not: boolean, key: string, a: any, b: any[]) {
	return not
		? `expect(${print(a)}).not.${key}(${prints(b)})`
		: `expect(${print(a)}).${key}(${prints(b)})`
}

function expectancy<A extends Record<string, (...p: any[]) => (boolean | Promise<boolean>)>>(
		not: boolean,
		a: any,
		assertions: A,
		message?: string,
	) {
	return Object.fromEntries(
		Object.entries(assertions).map(([key, fn]) => {
			const fn1 = fn as (...b: any[]) => (boolean | Promise<boolean>)
			const fn2 = (...b: any[]) => {
				const result = fn1(...b)
				if (result instanceof Promise) {
					return result.then(r => {
						if (!r) throw new Fail(message ?? expectmessage(not, key, a, b))
						return r
					})
				}
				else {
					if (!result) throw new Fail(message ?? expectmessage(not, key, a, b))
					return result
				}
			}
			return [key, fn2]
		})
	) as A
}

export const expect = (a: any, message?: string) => ({
	...expectancy(false, a, makeAssertions(a), message),
	not: expectancy(true, a, inverseAssertions(a), message),
})

