import { IBaseData, IData } from '../Types'

const NormalizeData = <T>(data: IData<T>, validCountries: IBaseData[]) => {
	const validCountriesName = validCountries.map(row => row.country)

	const newData: IData<T> = []
	const existCountries: string[] = []

	for (const row of data) {
		if (!validCountriesName.includes(row.country)) continue

		newData.push(row)

		existCountries.push(row.country)
	}

	const unexistCountries = validCountriesName.filter(
		name => !existCountries.includes(name)
	)

	for (const unexistCountry of unexistCountries) {
		newData.push({
			country: unexistCountry,
			data: null,
		})
	}

	return newData
}

export default NormalizeData
