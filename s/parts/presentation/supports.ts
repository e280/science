
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
	if (isNode()) process.exit(code)
	else if (isDeno()) Deno.exit(code)
}

export function setExitCode(code: number) {
	if (isNode()) process.exitCode = code
	else if (isDeno()) Deno.exitCode = code
}

export function hasEnv(name: string): boolean {
	if (isNode())
		return name in process.env
	else if (isDeno())
		return Deno.env.get(name) !== undefined
	return false
}

export function hasArg(arg: string): boolean {
	if (isNode())
		return process.argv.slice(1).includes(arg)
	else if (isDeno())
		return Deno.args.includes(arg)
	else
		return false
}

function findArgValue(name: string, args: string[]) {
	for (const arg of args) {
		if (arg.includes("=")) {
			const [first, ...rest] = arg.split("=")
			if (first === name)
				return rest.join("=")
		}
	}
}

export function getArg(name: string) {
	if (isNode())
		return findArgValue(name, process.argv.slice(1))
	else if (isDeno())
		return findArgValue(name, Deno.args)
}

export function getEnv(name: string): string | undefined {
	if (isNode())
		return process.env[name]
	else if (isDeno())
		return Deno.env.get(name)
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

