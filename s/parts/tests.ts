
import {meta, Suite} from "./types.js"

export function tests<S extends Suite>(suite: S): S {
	return suite
}

tests.only = <S extends Suite>(suite: S): S => (suite[meta] = {kind: "only"}, suite)
tests.skip = <S extends Suite>(suite: S): S => (suite[meta] = {kind: "skip"}, suite)

