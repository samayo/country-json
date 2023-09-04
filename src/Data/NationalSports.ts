import { parse } from 'node-html-parser'
import { IData, IDataSingle } from '../Types'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import ParseWikipediaFloat from '../Utils/ParseWikipediaFloat.js'

export interface IOfficialNationalSport {
	name: string
	isOfficial: true
	yearDefinedAsNationalSport: number
}

export interface IUnofficialNationalSport {
	name: string
	isOfficial: false
	yearDefinedAsNationalSport?: never
}

export type INationalSport = IOfficialNationalSport | IUnofficialNationalSport

export interface INationalSports {
	nationalSports: INationalSport[]
}

const ScrapNationalSports = async (): Promise<IData<INationalSports>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/National_sport'
	).then(response => response.text())

	const root = parse(rawHtml)

	const data: Record<string, IDataSingle<INationalSports>> = {}

	const AddData = (country: string, sportData: INationalSport) => {
		if (data[country]) data[country].data.nationalSports.push(sportData)
		else
			data[country] = {
				country,
				data: {
					nationalSports: [sportData],
				},
			}
	}

	const officialDataTable = root.querySelectorAll('.wikitable.sortable')[0]
	const unofficialDataTable = root.querySelectorAll('.wikitable.sortable')[1]

	const officialDataTableBody = officialDataTable.querySelector('tbody')
	const unofficialDataTableBody = unofficialDataTable.querySelector('tbody')

	// Select all rows except header row element
	const officialRows = officialDataTableBody.querySelectorAll(
		'tr:not(:first-child)'
	)
	const unofficialRows = unofficialDataTableBody.querySelectorAll(
		'tr:not(:first-child)'
	)

	for (const row of officialRows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		const country = await GetWikipediaFinalRedirect(
			WikipediaURLToTitle(
				children[0].querySelector('a').getAttribute('href')
			)
		)

		const yearDefinedAsNationalSport = ParseWikipediaFloat(
			children[2].innerText.trim()
		)

		const nationalSports = children[1].querySelectorAll('a')

		for (const nationalSport of nationalSports) {
			AddData(country, {
				name: nationalSport.innerText,
				isOfficial: true,
				yearDefinedAsNationalSport,
			} as IOfficialNationalSport)
		}
	}

	for (const row of unofficialRows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		const country = await GetWikipediaFinalRedirect(
			WikipediaURLToTitle(
				children[0].querySelector('a').getAttribute('href')
			)
		)

		const nationalSports = children[1].querySelectorAll('> a')

		for (const nationalSport of nationalSports) {
			AddData(country, {
				name: nationalSport.innerText,
				isOfficial: false,
			} as IUnofficialNationalSport)
		}
	}

	return Object.values(data)
}

export default ScrapNationalSports
