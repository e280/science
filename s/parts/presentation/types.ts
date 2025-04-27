
import {Theme} from "./themes.js"
import {Execution} from "../execution/execute.js"

export type Options = {
	theme: Theme
	verbose: boolean
}

export function options(o: Partial<Options>) {
	return o
}

export class Stdout {
	constructor(public line: string) {}
}

export class Stderr {
	constructor(public line: string) {}
}

export type Output = (Stdout | Stderr)

export type Summary = {
	code: 0 | 1
	outputs: Output[]
	execution: Execution
}

