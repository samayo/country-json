import { IData } from '../Types'
import { IUnitedNationsMember } from './UnitedNationsMember'

export type ICountriesName = null

const ScrapCountriesName = async (
	unitedNationsMembers: IData<IUnitedNationsMember>
): Promise<IData<ICountriesName>> =>
	unitedNationsMembers.map(row => ({
		country: row.country,
		data: null,
	}))

export default ScrapCountriesName
