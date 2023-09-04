import path from 'path'
import fs from 'fs/promises'

const DataReader = async (inputPath: string, fileName: string) => {
	const filePath = path.join(inputPath, `${fileName}.json`)

	const file = await fs.readFile(filePath)

	return file.toString()
}

export default DataReader
