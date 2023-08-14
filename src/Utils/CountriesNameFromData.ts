import { IData } from '../Types'

export type ICountriesName = string[]

const CountriesNameFromData = (unitedNationsMembers: IData<unknown>) =>
	unitedNationsMembers.map(data => data.country)

export default CountriesNameFromData
