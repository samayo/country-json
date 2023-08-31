import { HTMLElement, NodeType, parse } from 'node-html-parser'
import { IData } from '../Types'
import ParseWikipediaFloat from '../Utils/ParseWikipediaFloat.js'
import HTMLEntities from '../Constants/HTMLEntities.js'
import WikipediaURLToTitle from '../Utils/WikipediaURLToTitle.js'
import GetWikipediaFinalRedirect from '../Utils/GetWikipediaFinalRedirect.js'
import IsNodeWikipediaFlagIcon from '../Utils/IsNodeWikipediaFlagIcon.js'

export interface ICallingCodes {
	code: number
}

const ScrapCallingCodes = async (): Promise<IData<ICallingCodes>> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/List_of_country_calling_codes'
	).then(response => response.text())

	const root = parse(rawHtml)

	const rootList = root.querySelectorAll(
		'h3 + p + ul, h3 + ul, h3 + :is(style, link) + div + p + ul'
	)

	for (const list of rootList) {
		for (const row of list.querySelectorAll('> *')) {
			if (
				row.childNodes?.[2]?.nodeType === NodeType.ELEMENT_NODE &&
				IsNodeWikipediaFlagIcon(row.childNodes[2] as HTMLElement)
			) {
				if (
					row.childNodes?.[3]?.nodeType === NodeType.ELEMENT_NODE &&
					(row.childNodes[3] as HTMLElement).rawTagName === 'a'
				) {
					const country = await GetWikipediaFinalRedirect(
						WikipediaURLToTitle(
							(row.childNodes[3] as HTMLElement).getAttribute(
								'href'
							)
						)
					)

					const codes = (row.childNodes[0] as HTMLElement).innerText

					console.log({ country, codes })
				}
			}
		}
	}

	return []
}

export default ScrapCallingCodes
