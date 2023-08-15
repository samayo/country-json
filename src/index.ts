import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

import ScrapAverageHeight from './Data/AverageHeight.js'
import ScrapISO3166 from './Data/ISO3166.js'
import ScrapUnitedNationsMember from './Data/UnitedNationsMember.js'
import DataWriter from './Utils/DataWriter.js'
import NormalizeData from './Utils/NormalizeData.js'
import Wait from './Utils/Wait.js'
import WikipediaRedirectCache from './Cache/WikipediaRedirectCache.js'
import DataReader from './Utils/DataReader.js'
import EnsureDirectoryExist from './Utils/EnsureDirectoryExist.js'
import EnsureDirectoryExistAndEmpty from './Utils/EnsureDirectoryExistAndEmpty.js'

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
		console.error('Use wikipedia redirect cache error', e)
		console.log('Fallback without wikipedia redirect cache')
	}
}

const unitedNationsMembers = await ScrapUnitedNationsMember()
const validCountries = unitedNationsMembers.map(row => ({
	wikipediaTitle: row.wikipediaTitle,
	country: row.country,
}))

await DataWriter(outputPath, unitedNationsMembers, 'unitedNationsMembers')

await Wait(delayBetweenRequest)

const ISO3166 = NormalizeData(await ScrapISO3166(), validCountries)

await DataWriter(outputPath, ISO3166, 'ISO3166')

await Wait(delayBetweenRequest)

const averageHeight = NormalizeData(await ScrapAverageHeight(), validCountries)

await DataWriter(outputPath, averageHeight, 'averageHeight')

if (writeWikipediaRedirectCache) {
	// Write wikipedia redirect cache
	await fs.writeFile(
		path.join(tempPath, `${wikipediaRedirectCacheFileName}.json`),
		WikipediaRedirectCache.ToJSON()
	)
}
