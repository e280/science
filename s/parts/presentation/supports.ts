
declare const Deno: any

export function isDeno() {
	return typeof Deno !== "undefined" && typeof Deno.version !== "undefined"
}

export function isNode() {
	return (
		typeof process !== "undefined" &&
		process.versions &&
		process.versions.node
	)
}

export function isColorSupported() {
	if (isNode())
		return (process.env.FORCE_COLOR) || (
			process.stdout.isTTY &&
			process.env.TERM !== "dumb"
		)

	else if (isDeno())
		return (Deno.env.get("FORCE_COLOR")) || (
			Deno.isatty(Deno.stdout.rid) &&
			Deno.env.get("TERM") !== "dumb"
		)

	else
		return false
}

export function exit(code: number) {
	if (isNode())
		process.exit(code)
	else if (isDeno())
		Deno.exit(code)
}

export function hasArg(arg: string) {
	if (isNode())
		return process.argv.slice(1).includes(arg)
	else if (isDeno())
		return Deno.args.includes(arg)
	else
		return false
}

export async function writeStdout(line: string) {
	if (isNode())
		process.stdout.write(line + "\n")
	else if (isDeno())
		await Deno.stdout.write(new TextEncoder().encode(line + "\n"))
	else
		console.log(line)
}

export async function writeStderr(line: string) {
	if (isNode())
		process.stderr.write(line + "\n")
	else if (isDeno())
		await Deno.stderr.write(new TextEncoder().encode(line + "\n"))
	else
		console.error(line)
}

