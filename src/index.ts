import ScrapAverageHeight from './Data/AverageHeight.js'
import ScrapISO3166 from './Data/ISO3166.js'
import ScrapUnitedNationsMember from './Data/UnitedNationsMember.js'
import CountriesNameFromData from './Utils/CountriesNameFromData.js'
import NormalizeData from './Utils/NormalizeData.js'
import Wait from './Utils/Wait.js'

const delayBetweenRequest = 2000

console.log('Country JSON Scrapper!')

const unitedNationsMembers = await ScrapUnitedNationsMember()
const validCountriesName = CountriesNameFromData(unitedNationsMembers)

await Wait(delayBetweenRequest)

const ISO3166 = NormalizeData(await ScrapISO3166(), validCountriesName)

await Wait(delayBetweenRequest)

const averageHeight = NormalizeData(
	await ScrapAverageHeight(),
	validCountriesName
)
