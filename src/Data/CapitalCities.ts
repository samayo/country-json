import { parse } from 'node-html-parser'
import { IData } from '../Types'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import NormalizeTable from '../Utils/NormalizeTable.js'

export type ICapitalCities = { name: string; types: string[] }[]

const ScrapCapitalCities = async (): Promise<IData<ICapitalCities>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/List_of_national_capitals'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector('.wikitable.sortable tbody')

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th))')

	const rawData: Record<string, string[]> = {}

	const normalizedRows = NormalizeTable(rows)

	for (const row of normalizedRows) {
		const country = await GetWikipediaFinalRedirect(
			WikipediaURLToTitle(row[1].querySelector('a').getAttribute('href'))
		)

		const rawCity = row[0].innerText.trim()

		if (!rawData[country]) rawData[country] = [rawCity]
		else rawData[country].push(rawCity)
	}

	const cleanedData = Object.entries(rawData).map(
		([country, cities]) =>
			[
				country,
				cities.map(city => ({
					name: city.split('(')[0].trim(),
					types:
						city
							.split('(')[1]
							?.split(')')[0]
							?.split(/(?:and)|,/gi)
							?.map(type => type.trim()) ?? [],
				})),
			] as [string, { name: string; types: string[] }[]]
	)

	return cleanedData.map(([country, data]) => ({ country, data }))
}

export default ScrapCapitalCities
