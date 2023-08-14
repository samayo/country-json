import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs/promises'

import { IData } from '../Types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const outputDir = '/dist/'

const DataWriter = async <T>(data: IData<T>, fileName: string) => {
	const filePath = path.join(dirname, outputDir, `${fileName}.json`)

	await fs.writeFile(filePath, JSON.stringify(data))
}

export default DataWriter
