
import {Fail} from "./errors.js"

export function assert<Value>(
		value: Value,
		message = "assert fail",
	): asserts value  {

	if (!value)
		throw new Fail(message)
}

