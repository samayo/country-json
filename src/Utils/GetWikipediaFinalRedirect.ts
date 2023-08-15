import GetWikipediaRedirect from './GetWikipediaRedirect.js'

/**
 * @param title
 * @returns Final target title. if there is no redirect it will return the same title
 */
const GetWikipediaFinalRedirect = async (title: string) => {
	let lastTitle = title

	while (true) {
		const [isCached, result] = await GetWikipediaRedirect(lastTitle)

		if (result === false) return lastTitle

		lastTitle = result
	}
}

export default GetWikipediaFinalRedirect
