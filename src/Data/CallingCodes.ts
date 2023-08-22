import { parse } from 'node-html-parser'
import { IData } from '../Types'
import ParseWikipediaFloat from '../Utils/ParseWikipediaFloat.js'
import HTMLEntities from '../Constants/HTMLEntities.js'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'

export interface ICallingCodes {
	code: number
}

const ScrapCallingCodes = async (): Promise<IData<ICallingCodes>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/List_of_country_calling_codes'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector('.wikitable.sortable tbody')

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th))')

	const data: IData<ICallingCodes> = []

	for (const row of rows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		const country = await GetWikipediaFinalRedirect(
			WikipediaURLToTitle(
				children[0].querySelector('a').getAttribute('href')
			)
		)
		const male = ParseWikipediaFloat(
			children[1].innerText.split(HTMLEntities.NonBreakingSpace)[0]
		)

		data.push({
			country,
			data: {
				code: 1,
			},
		})
	}

	return data
}

export default ScrapCallingCodes
