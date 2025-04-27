
export type GlyphSet = {
	skip: string
	only: string
	testFail: string
	testSuccess: string
	suiteFail: string
	suiteSuccess: string
	timeSeparator: string
	pathSeparator: string
	messageSeparator: string
}

export function asGlyphSet<G extends GlyphSet>(g: G) {
	return g
}

export const glyphs = {
	plain: asGlyphSet({
		skip: "[SKIP]",
		only: "[ONLY]",
		testFail: "[X]",
		testSuccess: " • ",
		suiteFail: "[FAIL]",
		suiteSuccess: "[GOOD]",
		timeSeparator: " - ",
		pathSeparator: " > ",
		messageSeparator: " :: ",
	}),

	standard: asGlyphSet({
		skip: "👻",
		only: "🚧",
		testFail: "❌",
		testSuccess: " •",
		suiteFail: "🟥",
		suiteSuccess: "✅",
		timeSeparator: " - ",
		pathSeparator: " > ",
		messageSeparator: " :: ",
	}),

	seaside: asGlyphSet({
		skip: "👻",
		only: "🚧",
		testFail: "❌",
		testSuccess: " •",
		suiteFail: "🟥",
		suiteSuccess: "💙",
		timeSeparator: " - ",
		pathSeparator: " > ",
		messageSeparator: " :: ",
	}),
}

