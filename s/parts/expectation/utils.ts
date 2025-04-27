
import {Fail} from "./errors.js"
import {makeAssertions} from "./assertions.js"

export function expectancy<A extends Record<string, (...p: any[]) => (boolean | Promise<boolean>)>>(
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

export const inverseAssertions = (a: any) => {
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

function trunc(s: string, max = 16) {
	return s.length > max
		? `${s.slice(max)}...`
		: s
}

export function display(x: any) {
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

function displays(p: any[]) {
	return p.map(display).join(", ")
}

function expectmessage(not: boolean, key: string, a: any, b: any[]) {
	return not
		? `expect(${display(a)}).not.${key}(${displays(b)})`
		: `expect(${display(a)}).${key}(${displays(b)})`
}

