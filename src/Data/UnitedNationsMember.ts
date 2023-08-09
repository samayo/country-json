import { parse } from 'node-html-parser'
import DateStringToUnixEpoch from '../Utils/DateStringToUnixEpoch.js'
import { IData } from '../Types.js'

export interface IUnitedNationsMember {
	isOriginalMember: boolean

	/**
	 * Expoch unix timestamp
	 */
	dateOfAdmission: number
}

const ScrapUnitedNationsMember = async (): Promise<
	IData<IUnitedNationsMember>
> => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/Member_states_of_the_United_Nations'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector(
		'.wikitable.sortable.plainrowheaders tbody'
	)

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th[scope=col]))')

	const data: IData<IUnitedNationsMember> = []

	for (const row of rows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		const country = children[0].querySelector('a').innerText
		const dateOfAdmissionString =
			children[1].querySelector('span').innerText
		const isOriginalMember =
			children[2].getAttribute('data-sort-value') === 'Yes'

		// Assume wikipedia date is valid
		const dateOfAdmission = DateStringToUnixEpoch(
			dateOfAdmissionString
		) as number

		data.push({
			country,
			dateOfAdmission,
			isOriginalMember,
		})
	}

	return data
}

export default ScrapUnitedNationsMember
