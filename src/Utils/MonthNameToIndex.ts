export const MonthNameToIndexMap = {
	january: 0,
	february: 1,
	march: 2,
	april: 3,
	may: 4,
	june: 5,
	july: 6,
	august: 7,
	september: 8,
	october: 9,
	november: 10,
	december: 11,
} as const satisfies Record<string, number>

const MonthNameToIndex = (monthName: string): number | false => {
	const lowerCaseMonthName = monthName.toLowerCase()

	const index = MonthNameToIndexMap[lowerCaseMonthName] as number | undefined

	if (!index) return false

	return index
}

export default MonthNameToIndex
