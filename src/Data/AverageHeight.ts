import { parse } from 'node-html-parser'
import { IData } from '../Types'
import ParseWikipediaFloat from '../Utils/ParseWikipediaFloat.js'
import HTMLEntities from '../Constants/HTMLEntities.js'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'

enum IAverageHeightMethodology {
	Measured = 'Measured',
	SelfReported = 'SelfReported',
}

interface IAverageHeightBase {
	methodology: IAverageHeightMethodology
}

interface IAverageHeightMaleNull {
	male: null
	female: number
	maleToFemaleRatio: null
}

interface IAverageHeightFemaleNull {
	male: number
	female: null
	maleToFemaleRatio: null
}

interface IAverageHeightAllNull {
	male: null
	female: null
	maleToFemaleRatio: null
}

interface IAverageHeightAll {
	male: number
	female: number
	maleToFemaleRatio: number
}

export type IAverageHeight = (
	| IAverageHeightMaleNull
	| IAverageHeightFemaleNull
	| IAverageHeightAllNull
	| IAverageHeightAll
) &
	IAverageHeightBase

const ScrapAverageHeight = async (): Promise<IData<IAverageHeight>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/Average_human_height_by_country'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector('.wikitable.sortable tbody')

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th))')

	const data: IData<IAverageHeight> = []

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
		const female = ParseWikipediaFloat(
			children[2].innerText.split(HTMLEntities.NonBreakingSpace)[0]
		)
		const maleToFemaleRatio = ParseWikipediaFloat(children[3].innerText)
		const methodologyString = children[6].innerText

		let methodology: IAverageHeightMethodology = null

		if (methodologyString === 'Measured')
			methodology = IAverageHeightMethodology.Measured
		else if (methodologyString === 'Self-reported')
			methodology = IAverageHeightMethodology.SelfReported

		data.push({
			country,
			data: {
				male: Number.isNaN(male) ? null : male,
				female: Number.isNaN(female) ? null : female,
				maleToFemaleRatio: Number.isNaN(maleToFemaleRatio)
					? null
					: maleToFemaleRatio,
				methodology,
			},
		})
	}

	return data
}

export default ScrapAverageHeight
