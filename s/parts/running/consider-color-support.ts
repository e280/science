
import {Theme, themes} from "../presentation/themes.js"
import {isColorSupported} from "../presentation/supports.js"

export const considerColorSupport = (theme: Theme) => ({
	...theme,
	colors: isColorSupported()
		? theme.colors
		: themes.plain.colors,
})

