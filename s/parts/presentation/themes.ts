
import {color} from "./coloring.js"

export type Theme = {
	colors: ThemeColors
	icons: ThemeIcons
}

export function asTheme(theme: Theme) {
	return theme
}

export type ColorFn = (s: string) => string

export type ThemeColors = {
	skip: ColorFn
	only: ColorFn
	neutral: ColorFn
	neutralLabel: ColorFn

	successSuite: ColorFn
	successGrammar: ColorFn
	successPath: ColorFn
	successLabel: ColorFn
	successTime: ColorFn

	errorSuite: ColorFn
	errorDidnt: ColorFn
	errorPath: ColorFn
	errorGrammar: ColorFn
	errorLabel: ColorFn
	errorMessage: ColorFn
	errorTime: ColorFn
}

export type ThemeIcons = {
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

export const themes = {
	plain: asTheme({
		colors: {
			skip: color.none,
			only: color.none,
			neutral: color.none,
			neutralLabel: color.none,

			successSuite: color.none,
			successPath: color.none,
			successGrammar: color.none,
			successLabel: color.none,
			successTime: color.none,

			errorSuite: color.none,
			errorDidnt: color.none,
			errorPath: color.none,
			errorLabel: color.none,
			errorGrammar: color.none,
			errorMessage: color.none,
			errorTime: color.none,
		},
		icons: {
			skip: "⏭",
			only: "*",
			testFail: "✘ ",
			testSuccess: " •",
			testNeutral: " •",
			suiteFail: "FAIL!!",
			suiteSuccess: "good:",
			timeSeparator: " - ",
			pathSeparator: " > ",
			messageSeparator: " :: ",
		},
	}),

	redgreen: asTheme({
		colors: {
			skip: color.yellow,
			only: color.yellow,
			neutral: s => color.dim(color.white(s)),
			neutralLabel: color.white,

			successSuite: color.brightGreen,
			successPath: color.green,
			successGrammar: s => color.dim(color.green(s)),
			successLabel: s => color.bold(color.brightGreen(s)),
			successTime: s => color.dim(color.green(s)),

			errorSuite: color.brightRed,
			errorDidnt: color.red,
			errorPath: color.red,
			errorLabel: s => color.bold(color.brightRed(s)),
			errorGrammar: s => color.dim(color.red(s)),
			errorMessage: color.red,
			errorTime: s => color.dim(color.red(s)),
		},
		icons: {
			skip: "👻",
			only: "🚧",
			testFail: "❌",
			testSuccess: " •",
			testNeutral: " •",
			suiteFail: "🔥",
			suiteSuccess: "✅",
			timeSeparator: " - ",
			pathSeparator: " > ",
			messageSeparator: " :: ",
		},
	}),

	seaside: asTheme({
		colors: {
			skip: color.yellow,
			only: color.yellow,
			neutral: s => color.dim(color.white(s)),
			neutralLabel: color.white,

			successSuite: color.brightBlue,
			successPath: color.blue,
			successGrammar: s => color.dim(color.blue(s)),
			successLabel: s => color.bold(color.brightBlue(s)),
			successTime: s => color.dim(color.blue(s)),

			errorSuite: color.brightRed,
			errorDidnt: color.red,
			errorPath: color.red,
			errorLabel: s => color.bold(color.brightRed(s)),
			errorGrammar: s => color.dim(color.red(s)),
			errorMessage: color.red,
			errorTime: s => color.dim(color.red(s)),
		},
		icons: {
			skip: "👻",
			only: "🚧",
			testFail: "❌",
			testSuccess: " •",
			testNeutral: " •",
			suiteFail: "🔥",
			suiteSuccess: "✅",
			timeSeparator: " - ",
			pathSeparator: " > ",
			messageSeparator: " :: ",
		},
	}),
}

