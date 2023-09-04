import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

import ScrapAverageHeight from './Data/AverageHeight.js'
import ScrapISO3166 from './Data/ISO3166.js'
import WikipediaRedirectCache from './Cache/WikipediaRedirectCache.js'
import DataReader from './Utils/DataReader.js'
import EnsureDirectoryExist from './Utils/EnsureDirectoryExist.js'
import EnsureDirectoryExistAndEmpty from './Utils/EnsureDirectoryExistAndEmpty.js'
import ProcessData from './Utils/ProcessData.js'
import ScrapCountriesName from './Data/CountriesName.js'
import ScrapGS1Code from './Data/GS1Code.js'
import ScrapCapitalCities from './Data/CapitalCities.js'
import ScrapCallingCodes from './Data/CallingCodes.js'
import ScrapAverageElevation from './Data/AverageElevation.js'

const delayBetweenRequest = 2000
const useWikipediaRedirectCache = true
const writeWikipediaRedirectCache = true

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const outputDir = '/dist/'
const tempDir = '/temp/'

const outputPath = path.join(dirname, '../', outputDir)
const tempPath = path.join(dirname, '../', tempDir)

await EnsureDirectoryExistAndEmpty(outputPath)

if (useWikipediaRedirectCache || writeWikipediaRedirectCache) {
	await EnsureDirectoryExist(tempPath)
}

const wikipediaRedirectCacheFileName = 'WikipediaRedirectCache'

console.log('Country JSON Scrapper!')

if (useWikipediaRedirectCache) {
	try {
		await fs.access(
			path.join(tempPath, `${wikipediaRedirectCacheFileName}.json`),
			fs.constants.F_OK
		)

		const wikipediaRedirectCache = await DataReader(
			tempPath,
			wikipediaRedirectCacheFileName
		)

		console.log('Using wikipedia redirect cache')

		WikipediaRedirectCache.Load(wikipediaRedirectCache)
	} catch (e) {
		if (
			e instanceof Error &&
			e.message.startsWith('ENOENT: no such file or directory')
		)
			console.error('Wikipedia redirect cache file not found')
		else console.error('Use wikipedia redirect cache unknown error', e)

		console.log('Fallback without wikipedia redirect cache')
	}
}

await ProcessData(
	outputPath,
	{
		// ISO3166: async () => await ScrapISO3166(),
		// AverageHeight: async () => await ScrapAverageHeight(),
		// CountriesName: async unitedNationsMembers =>
		// 	await ScrapCountriesName(unitedNationsMembers),
		// GS1Code: async () => await ScrapGS1Code(),
		// CapitalCities: async () => await ScrapCapitalCities(),
		// CallingCodes: async () => await ScrapCallingCodes(),
		AverageElevation: async () => await ScrapAverageElevation(),
	},
	{
		delayBetweenRequest,
	}
)

if (writeWikipediaRedirectCache) {
	// Write wikipedia redirect cache
	await fs.writeFile(
		path.join(tempPath, `${wikipediaRedirectCacheFileName}.json`),
		WikipediaRedirectCache.ToJSON()
	)
}
