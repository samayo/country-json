import { IRawData } from '../Types'
import { IUnitedNationsMember } from './UnitedNationsMember'

export type ICountriesName = null

const ScrapCountriesName = async (
	unitedNationsMembers: IRawData<IUnitedNationsMember>
): Promise<IRawData<ICountriesName>> =>
	unitedNationsMembers.map(row => ({
		country: row.country,
		wikipediaTitle: row.wikipediaTitle,
		data: null,
	}))

export default ScrapCountriesName
