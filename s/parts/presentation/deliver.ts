
import {exit} from "./supports.js"
import {Summary, Stderr} from "./types.js"

export function deliver(summary: Summary) {
	for (const output of summary.outputs) {
		if (output instanceof Stderr)
			console.error(output.line)
		else
			console.log(output.line)
	}
	exit(summary.code)
}

