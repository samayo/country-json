import fs from 'fs/promises'

const EnsureDirectoryExist = async (path: string) => {
	try {
		await fs.access(path, fs.constants.F_OK)
	} catch {
		await fs.mkdir(path)
	}
}

export default EnsureDirectoryExist
