
import {exit, writeStderr, writeStdout} from "./supports.js"
import {Summary, Stderr} from "./types.js"

export async function deliver(summary: Summary) {
	for (const output of summary.outputs) {
		if (output instanceof Stderr)
			await writeStderr(output.line)
		else
			await writeStdout(output.line)
	}
	exit(summary.code)
}

