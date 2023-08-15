import WikipediaRedirectCache from '../Cache/WikipediaRedirectCache.js'

/**
 * @param title
 * @returns [isCached, Target title or false if there is no redirect]
 */
const GetWikipediaRedirect = async (
	title: string
): Promise<[boolean, string | false]> => {
	if (WikipediaRedirectCache.IsCached(title))
		return [true, WikipediaRedirectCache.GetCache(title)]

	const data = await fetch(
		`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&redirects&format=json`
	).then(request => request.json())

	if (data.query.redirects) {
		WikipediaRedirectCache.SetCache(
			title,
			data.query.redirects[0].to as string
		)

		return [false, data.query.redirects[0].to as string]
	}
	if (data.query.normalized) {
		WikipediaRedirectCache.SetCache(
			title,
			data.query.normalized[0].to as string
		)

		return [false, data.query.normalized[0].to as string]
	}

	WikipediaRedirectCache.SetCache(title, false)

	return [false, false]
}

export default GetWikipediaRedirect
