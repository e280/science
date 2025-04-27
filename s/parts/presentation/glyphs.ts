
export type GlyphSet = {
	skip: string
	only: string
	testFail: string
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
		suiteFail: "❌",
		suiteSuccess: "✅",
	}),

	simple: asGlyphSet({
		skip: "[SKIP]",
		only: "[ONLY]",
		testFail: "[X]",
		suiteFail: "[FAIL]",
		suiteSuccess: "[GOOD]",
	}),
}

