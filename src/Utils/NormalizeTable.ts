import { HTMLElement } from 'node-html-parser'

const NormalizeTable = (rows: HTMLElement[]) => {
	const result: HTMLElement[][] = []

	rows.forEach((row, y) =>
		row.querySelectorAll('td').forEach((cell, x) => {
			const rowspan = parseInt(cell.getAttribute('rowspan') ?? '1')
			const colspan = parseInt(cell.getAttribute('colspan') ?? '1')

			while (result[y] && result[y][x]) {
				x += 1
			}

			for (let y2 = y; y2 < y + rowspan; y2++) {
				result[y2] ??= []

				for (let j = 0; j < colspan; j++) {
					result[y2][x + j] = cell
				}
			}
		})
	)

	return result.filter(row => row.length > 0)
}

export default NormalizeTable
