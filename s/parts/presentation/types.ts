
import {Execution} from "../execution/execute.js"

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

