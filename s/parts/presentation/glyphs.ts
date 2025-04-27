
export type GlyphSet = {
	skip: string
	only: string
	testFail: string
	testSuccess: string
	suiteFail: string
	suiteSuccess: string
}

export function asGlyphSet<G extends GlyphSet>(g: G) {
	return g
}

export const glyphs = {
	emoji: asGlyphSet({
		skip: "👻",
		only: "🚧",
		testFail: "🚫",
		testSuccess: "🍏",
		suiteFail: "❌",
		suiteSuccess: "✅",
	}),

	simple: asGlyphSet({
		skip: "[SKIP]",
		only: "[ONLY]",
		testFail: "[X]",
		testSuccess: "[O]",
		suiteFail: "[FAIL]",
		suiteSuccess: "[GOOD]",
	}),
}

