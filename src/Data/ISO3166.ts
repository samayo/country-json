import { parse } from 'node-html-parser'
import { IData } from '../Types'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'

export interface IISO3166 {
	alpha2: string
	alpha3: string
	numeric: number
}

const ScrapISO3166 = async (): Promise<IData<IISO3166>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/ISO_3166-1'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector(
		'.wikitable.sortable:has(caption) tbody'
	)

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th))')

	const data: IData<IISO3166> = []

	for (const row of rows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		const country = await GetWikipediaFinalRedirect(
			WikipediaURLToTitle(
				children[0].querySelector('a').getAttribute('href')
			)
		)
		const alpha2 = children[1].querySelector('a span').innerText
		const alpha3 = children[2].querySelector('span').innerText
		const numeric = parseInt(
			children[3].querySelector('span').innerText,
			10
		)

		data.push({
			country,
			data: { alpha2, alpha3, numeric },
		})
	}

	return data
}

export default ScrapISO3166
