
import {meta, Suite} from "./types.js"

export function suite<S extends Suite>(suite: S): S {
	return suite
}

suite.only = <S extends Suite>(suite: S): S => (suite[meta] = {kind: "only"}, suite)
suite.skip = <S extends Suite>(suite: S): S => (suite[meta] = {kind: "skip"}, suite)

