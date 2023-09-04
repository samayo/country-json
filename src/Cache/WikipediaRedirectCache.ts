class WikipediaRedirectCache {
	private static cache: Record<string, string | false> = {}

	public static GetCache(title: string) {
		return this.cache[title]
	}

	public static IsCached(title: string) {
		return title in this.cache
	}

	public static SetCache(title: string, target: string | false) {
		this.cache[title] = target
	}

	public static Load(cacheJSON: string) {
		this.cache = JSON.parse(cacheJSON)
	}

	public static ToJSON() {
		return JSON.stringify(this.cache)
	}
}

export default WikipediaRedirectCache
