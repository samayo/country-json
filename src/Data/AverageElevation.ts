import { parse } from 'node-html-parser'
import { IData } from '../Types'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import ParseWikipediaFloat from '../Utils/ParseWikipediaFloat.js'
import HTMLEntities from '../Constants/HTMLEntities.js'

export interface IAverageElevation {
	elevation: number
}

const ScrapAverageElevation = async (): Promise<IData<IAverageElevation>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/List_of_countries_by_average_elevation'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector('.wikitable.sortable tbody')

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th))')

	const data: IData<IAverageElevation> = []

	for (const row of rows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		// Ignore other than country link
		if (children[0].querySelector('a') === null) continue

		const country = await GetWikipediaFinalRedirect(
			WikipediaURLToTitle(
				children[0].querySelector('a').getAttribute('href')
			)
		)
		const elevation = ParseWikipediaFloat(
			children[1].innerText.split(HTMLEntities.NonBreakingSpace)[0]
		)

		data.push({
			country,
			data: { elevation },
		})
	}

	return data
}

export default ScrapAverageElevation
