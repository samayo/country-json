import ScrapAverageHeight from './Data/AverageHeight.js'
import ScrapISO3166 from './Data/ISO3166.js'
import ScrapUnitedNationsMember from './Data/UnitedNationsMember.js'
import CountriesNameFromData from './Utils/CountriesNameFromData.js'

console.log('Country JSON Scrapper!')

const unitedNationsMembers = await ScrapUnitedNationsMember()
const validCountriesName = CountriesNameFromData(unitedNationsMembers)

// await ScrapISO3166()
await ScrapAverageHeight()
