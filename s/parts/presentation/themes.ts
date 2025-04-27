
import {color} from "./coloring.js"

export type ColorFn = (s: string) => string

export type Theme = {
	special: ColorFn
	success: ColorFn
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

export function asTheme<T extends Theme>(theme: T) {
	return theme
}

export const themes = {
	standard: asTheme({
		special: color.yellow,
		success: color.green,
		successLabel: color.brightGreen,
		successTime: s => color.dim(color.green(s)),
		errorSuite: color.brightRed,
		errorDidnt: color.red,
		errorPath: color.red,
		errorLabel: s => color.bold(color.brightRed(s)),
		errorGrammar: s => color.dim(color.red(s)),
		errorMessage: color.red,
		errorTime: s => color.dim(color.red(s)),
	}),

	blank: asTheme({
		special: color.none,
		success: color.none,
		successLabel: color.none,
		successTime: color.none,
		errorSuite: color.none,
		errorDidnt: color.none,
		errorPath: color.none,
		errorLabel: color.none,
		errorGrammar: color.none,
		errorMessage: color.none,
		errorTime: color.none,
	}),
}

