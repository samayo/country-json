const ParseWikipediaFloat = (raw: string): number =>
	parseFloat(raw.replace(',', ''))

export default ParseWikipediaFloat
