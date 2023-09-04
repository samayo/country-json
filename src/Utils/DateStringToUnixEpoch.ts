import MonthNameToIndex from './MonthNameToIndex.js'

const DateStringToUnixEpoch = (dateStringRaw: string): number | false => {
	const [dateString, monthNameString, yearString] = dateStringRaw.split(' ')

	if (!dateString) return false
	if (!monthNameString) return false
	if (!yearString) return false

	const monthIndex = MonthNameToIndex(monthNameString)

	if (!monthIndex) return false

	const yearInt = parseInt(yearString, 10)
	const dateInt = parseInt(dateString, 10)

	if (dateInt > 31 || dateInt <= 0) return false

	const milliseconds = Date.UTC(yearInt, monthIndex, dateInt, 0, 0, 0, 0)

	// Unix epoch
	return milliseconds / 1000
}

export default DateStringToUnixEpoch
