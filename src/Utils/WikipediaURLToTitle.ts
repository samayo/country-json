const WikipediaURLToTitle = (url: string) =>
	decodeURI(url.split('/wiki/').at(-1))

export default WikipediaURLToTitle
