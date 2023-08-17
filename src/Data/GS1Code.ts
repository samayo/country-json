import { HTMLElement, NodeType, TextNode, parse } from 'node-html-parser'
import { IData, IDataSingle } from '../Types'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import WikipediaSpecialUnicode from '../Constants/WikipediaSpecialUnicode.js'
import IsNodeWikipediaFlagIcon from '../Utils/IsNodeWikipediaFlagIcon.js'

interface IGS1CodeRange {
	isRange: true

	/**
	 * Inclusive
	 */
	start: number

	/**
	 * Inclusive
	 */
	end: number
}

interface IGS1CodeSingle {
	isRange: false
	number: number
}

export type IGS1Code = (IGS1CodeSingle | IGS1CodeRange)[]

const ScrapGS1Code = async (): Promise<IData<IGS1Code>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/List_of_GS1_country_codes'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector('.wikitable.sortable tbody')

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th))')

	const data: Record<string, IDataSingle<IGS1Code>> = {}

	for (const row of rows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		const rawCodes = children[0].innerText

		const codeRange = rawCodes
			.split(WikipediaSpecialUnicode.EnDash)
			.map(code => parseInt(code, 10))
		const isRange = codeRange.length === 2

		const rawCountyNodes = children[1].childNodes

		// If the first element is not flagicon continue
		if (!IsNodeWikipediaFlagIcon(rawCountyNodes[0])) continue

		let nextIsCountryAnchor = false
		const countriesAnchor: HTMLElement[] = []

		for (const rawCountryNode of rawCountyNodes) {
			if (
				rawCountryNode.nodeType === NodeType.TEXT_NODE &&
				(rawCountryNode as TextNode).text.includes('(')
			)
				break

			if (
				nextIsCountryAnchor &&
				rawCountryNode.nodeType === NodeType.ELEMENT_NODE
			) {
				countriesAnchor.push(rawCountryNode as HTMLElement)

				nextIsCountryAnchor = false
			}

			if (IsNodeWikipediaFlagIcon(rawCountryNode))
				nextIsCountryAnchor = true
		}

		for (const countryAnchor of countriesAnchor) {
			const country = await GetWikipediaFinalRedirect(
				WikipediaURLToTitle(countryAnchor.getAttribute('href'))
			)

			if (Object.keys(data).includes(country)) {
				data[country].data.push(
					isRange
						? {
								isRange: true,
								start: codeRange[0],
								end: codeRange[1],
						  }
						: { isRange: false, number: codeRange[0] }
				)
			} else {
				data[country] = {
					country,
					data: [
						isRange
							? {
									isRange: true,
									start: codeRange[0],
									end: codeRange[1],
							  }
							: { isRange: false, number: codeRange[0] },
					],
				}
			}
		}
	}

	return Object.values(data)
}

export default ScrapGS1Code
