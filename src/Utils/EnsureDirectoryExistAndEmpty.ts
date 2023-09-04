import fs from 'fs/promises'
import EnsureDirectoryExist from './EnsureDirectoryExist.js'

const EnsureDirectoryExistAndEmpty = async (path: string) => {
	const isExist = await EnsureDirectoryExist(path)

	if (isExist) {
		await fs.rm(path, { recursive: true })

		await fs.mkdir(path)
	}
}

export default EnsureDirectoryExistAndEmpty
