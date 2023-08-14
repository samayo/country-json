import { IData } from '../Types'
import { ICountriesName } from './CountriesNameFromData'

const NormalizeData = <T>(data: IData<T>, countriesName: ICountriesName) => {
	const newData: IData<T> = []
	const existCountriesName = []

	for (const row of data) {
		if (!countriesName.includes(row.country)) continue

		newData.push(row)

		existCountriesName.push(row.country)
	}

	const unexistCountriesName = countriesName.filter(
		name => !existCountriesName.includes(name)
	)

	for (const country of unexistCountriesName) {
		newData.push({ country, data: null })
	}

	return newData
}

export default NormalizeData
