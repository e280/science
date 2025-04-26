
import {exit} from "./supports.js"
import {FullReport, Stderr} from "./types.js"

export function emit(report: FullReport) {
	for (const output of report.outputs) {
		if (output instanceof Stderr)
			console.error(output.line)
		else
			console.log(output.line)
	}
	exit(report.code)
}

