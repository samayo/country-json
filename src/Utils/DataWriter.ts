import path from 'path'
import fs from 'fs/promises'

import { IData } from '../Types'

const DataWriter = async <T>(
	outputPath: string,
	data: IData<T>,
	fileName: string
) => {
	const filePath = path.join(outputPath, `${fileName}.json`)

	await fs.writeFile(filePath, JSON.stringify(data))
}

export default DataWriter
