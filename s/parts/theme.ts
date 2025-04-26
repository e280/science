
import {color} from "@benev/argv"
import {Theme} from "./types.js"

export function defaultTheme(): Theme {
	return {
		success: color.green,
		successTime: s => color.dim(color.green(s)),
		errorPath: color.red,
		errorLabel: s => color.bold(color.brightRed(s)),
		errorGrammar: s => color.dim(color.red(s)),
		errorMessage: color.red,
		errorTime: s => color.dim(color.red(s)),
	}
}

