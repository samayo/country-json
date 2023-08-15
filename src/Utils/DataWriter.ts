import path from 'path'
import fs from 'fs/promises'

import { IRawData } from '../Types'
import RawDataToData from './RawDataToData.js'

const DataWriter = async <T>(
	outputPath: string,
	rawData: IRawData<T>,
	fileName: string,
	debug: boolean = false
) => {
	const filePath = path.join(outputPath, `${fileName}.json`)

	await fs.writeFile(
		filePath,
		JSON.stringify(debug ? rawData : RawDataToData(rawData))
	)
}

export default DataWriter
