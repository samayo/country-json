import fs from 'fs/promises'

const EnsureDirectoryExist = async (path: string) => {
	try {
		await fs.access(path, fs.constants.F_OK)

		return true
	} catch {
		await fs.mkdir(path)

		return false
	}
}

export default EnsureDirectoryExist
