
import {color} from "./coloring.js"

export type ColorFn = (s: string) => string

export type Theme = {
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

export function asTheme<T extends Theme>(theme: T) {
	return theme
}

export const themes = {
	plain: asTheme({
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
	}),

	redgreen: asTheme({
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
		errorLabel: s => color.bold(color.yellow(s)),
		errorGrammar: s => color.dim(color.red(s)),
		errorMessage: color.brightRed,
		errorTime: s => color.dim(color.red(s)),
	}),

	seaside: asTheme({
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
		errorMessage: color.brightRed,
		errorTime: s => color.dim(color.red(s)),
	}),
}

