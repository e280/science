
import {Theme} from "./presentation/themes.js"

export const meta = Symbol("meta")

export type Options = {
	theme: Theme
	verbose: boolean
}

export function options(o: Partial<Options>) {
	return o
}

export type Meta = {
	kind?: "only" | "skip"
}

export type Test = {
	(): Promise<void | boolean | string>
	[meta]?: Meta
}

export class Experiment {
	constructor(
		public time: number,
		public fail?: string,
	) {}
}

export class Tube {
	constructor(
		public label: string,
		public fn: Test,
		public path: string[],
	) {}

	get skip() {
		return this.fn[meta]?.kind === "skip"
	}

	get only() {
		return this.fn[meta]?.kind === "only"
	}
}

export type Suite = {
	[key: string]: Test | Suite
	[meta]?: Meta
}

