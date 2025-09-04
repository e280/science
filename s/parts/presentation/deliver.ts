
import {Summary, Stderr} from "./types.js"
import {setExitCode, writeStderr, writeStdout} from "./supports.js"

export async function deliver(summary: Summary) {
	for (const output of summary.outputs) {
		if (output instanceof Stderr)
			await writeStderr(output.line)
		else
			await writeStdout(output.line)
	}
	setExitCode(summary.code)
}

