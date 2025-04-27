
import {Theme} from "./themes.js"
import {GlyphSet} from "./glyphs.js"
import {ExecutionReport} from "../execution/execute.js"

export type Options = {
	theme: Theme
	glyphs: GlyphSet
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
	report: ExecutionReport
}

