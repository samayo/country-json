import { IRawBaseData, IRawData } from '../Types'

const NormalizeData = <T>(
	data: IRawData<T>,
	validCountries: IRawBaseData[]
) => {
	const validCountriesWikipediaTitle = validCountries.map(
		row => row.wikipediaTitle
	)
	const wikipediaTitleToNameMap = validCountries.reduce((acc, row) => {
		acc[row.wikipediaTitle] = row.country
		return acc
	}, {})

	const newData: IRawData<T> = []
	const existWikipediaTitle = []

	for (const row of data) {
		if (!validCountriesWikipediaTitle.includes(row.wikipediaTitle)) continue

		newData.push(row)

		existWikipediaTitle.push(row.wikipediaTitle)
	}

	const unexistWikipediaTitle = validCountriesWikipediaTitle.filter(
		url => !existWikipediaTitle.includes(url)
	)

	for (const wikipediaTitle of unexistWikipediaTitle) {
		newData.push({
			country: wikipediaTitleToNameMap[wikipediaTitle],
			wikipediaTitle,
			data: null,
		})
	}

	return newData
}

export default NormalizeData
