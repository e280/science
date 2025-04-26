
export function plural(x: number, one = "", many = "s") {
	return (x === 1) ? one : many
}

export function ms(t: number) {
	return `${t.toFixed(0)} ms`
}

export function chunkify<I>(array: I[], size: number): I[][] {
	const chunks: I[][] = []
	let currentChunk: I[] = []

	function commit() {
		if (currentChunk.length > 0) {
			chunks.push(currentChunk)
			currentChunk = []
		}
	}

	for (const item of array) {
		currentChunk.push(item)
		if (currentChunk.length >= size)
			commit()
	}

	commit()
	return chunks
}

