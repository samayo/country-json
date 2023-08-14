import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

import ScrapAverageHeight from './Data/AverageHeight.js'
import ScrapISO3166 from './Data/ISO3166.js'
import ScrapUnitedNationsMember from './Data/UnitedNationsMember.js'
import CountriesNameFromData from './Utils/CountriesNameFromData.js'
import DataWriter from './Utils/DataWriter.js'
import NormalizeData from './Utils/NormalizeData.js'
import Wait from './Utils/Wait.js'

const delayBetweenRequest = 2000

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const outputDir = '/dist/'

const outputPath = path.join(dirname, '../', outputDir)

// Ensure output dir exist
// Remove directory if exist
try {
	await fs.access(outputPath, fs.constants.F_OK)
	await fs.rm(outputPath, { recursive: true })
} catch {}

// Re create
await fs.mkdir(outputPath)

console.log('Country JSON Scrapper!')

const unitedNationsMembers = await ScrapUnitedNationsMember()
const validCountriesName = CountriesNameFromData(unitedNationsMembers)

await Wait(delayBetweenRequest)

const ISO3166 = NormalizeData(await ScrapISO3166(), validCountriesName)

await DataWriter(outputPath, ISO3166, 'ISO3166')

// await Wait(delayBetweenRequest)

// const averageHeight = NormalizeData(
// 	await ScrapAverageHeight(),
// 	validCountriesName
// )

// await DataWriter(outputPath, averageHeight, 'averageHeight')
