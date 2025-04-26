
import {Theme} from "./themes.js"
import {GlyphSet} from "./glyphs.js"
import {Ran} from "../runner/run.js"

export type Options = {
	theme: Theme
	glyphs: GlyphSet
}

export class Stdout {
	constructor(public line: string) {}
}

export class Stderr {
	constructor(public line: string) {}
}

export type Output = (Stdout | Stderr)

export type FullReport = {
	code: 0 | 1
	outputs: Output[]
	ran: Ran
}

