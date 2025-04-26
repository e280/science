
import {meta, Tests} from "./types.js"

export function tests<Ts extends Tests>(suite: Ts): Ts {
	return suite
}

tests.only = <Ts extends Tests>(suite: Ts): Ts => (suite[meta] = {kind: "only"}, suite)
tests.skip = <Ts extends Tests>(suite: Ts): Ts => (suite[meta] = {kind: "skip"}, suite)

