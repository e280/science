
export type GlyphSet = {
	skip: string
	only: string
	testFail: string
	testSuccess: string
	testNeutral: string
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
		skip: " 󱌃",
		only: " 󱌃",
		testFail: "[X]",
		testSuccess: " • ",
		testNeutral: " • ",
		suiteFail: "[FAIL]",
		suiteSuccess: "[GOOD]",
		timeSeparator: " - ",
		pathSeparator: " > ",
		messageSeparator: " :: ",
	}),

	redgreen: asGlyphSet({
		skip: "👻",
		only: "🚧",
		testFail: "❌",
		testSuccess: " •",
		testNeutral: " •",
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
		testNeutral: " •",
		suiteFail: "🟥",
		suiteSuccess: "💙",
		timeSeparator: " - ",
		pathSeparator: " > ",
		messageSeparator: " :: ",
	}),
}

