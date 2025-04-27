
export const meta = Symbol("meta")

export type Meta = {
	kind?: "only" | "skip"
}

export type Test = {
	(): Promise<void | boolean | string>
	[meta]?: Meta
}

export type Vial = {
	label: string
	fn: Test
	path: string[]
}

export type Suite = {
	[key: string]: Test | Suite
	[meta]?: Meta
}

export type TestReport = {
	vial: Vial
	time: number
	fail?: string
}

