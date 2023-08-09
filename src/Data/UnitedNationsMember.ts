import { parse } from 'node-html-parser'
import MonthNameToIndex from '../Utils/MonthNameToIndex.js'

export interface IUnitedNationsMember {
	isOriginalMember: boolean

	/**
	 * Expoch unix timestamp
	 */
	dateOfAdmission: number
}

const ScrapUnitedNationsMember = async () => {
	const rawHtml = await fetch(
		'https://en.wikipedia.org/wiki/Member_states_of_the_United_Nations'
	).then(response => response.text())

	const root = parse(rawHtml)

	const dataTableBody = root.querySelector(
		'.wikitable.sortable.plainrowheaders tbody'
	)

	// Select all rows except header row element
	const rows = dataTableBody.querySelectorAll('tr:not(:has(th[scope=col]))')

	for (const row of rows) {
		// Get all direct children
		const children = row.querySelectorAll('> *')

		const country = children[0].querySelector('a').innerText
		const dateOfAdmissionString =
			children[1].querySelector('span').innerText
		const isOriginalMember =
			children[2].getAttribute('data-sort-value') === 'Yes'

		const [
			dateOfAdmissionDateString,
			dateOfAdmissionMonthNameString,
			dateOfAdmissionYearString,
		] = dateOfAdmissionString.split(' ')

		const dateOfAdmissionMilliseconds = Date.UTC(
			parseInt(dateOfAdmissionYearString),
			MonthNameToIndex(dateOfAdmissionMonthNameString) as number, // Assume wikipedia date is always valid
			parseInt(dateOfAdmissionDateString, 10),
			0,
			0,
			0,
			0
		)

        // Unix epoch
		const dateOfAdmission = dateOfAdmissionMilliseconds / 1000

		console.log({
			country,
			dateOfAdmission,
			isOriginalMember,
		})
	}
}

export default ScrapUnitedNationsMember
