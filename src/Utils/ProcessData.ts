import { IData } from '../Types'

import DataWriter from './DataWriter.js'

import ScrapUnitedNationsMember, {
	IUnitedNationsMember,
} from '../Data/UnitedNationsMember.js'
import Wait from './Wait.js'
import NormalizeData from './NormalizeData.js'

type IProcessData = (
	outputPath: string,
	data: Record<
		string,
		| (() => Promise<IData<unknown>>)
		| ((
				unitedNationsMembers: IData<IUnitedNationsMember>
		  ) => Promise<IData<unknown>>)
	>,
	options: { delayBetweenRequest: number }
) => Promise<void>

const ProcessData: IProcessData = async (
	outputPath: string,
	data,
	{ delayBetweenRequest = 2000 }
) => {
	const unitedNationsMembers = await ScrapUnitedNationsMember()
	const validCountries = unitedNationsMembers.map(row => ({
		country: row.country,
	}))

	await DataWriter(outputPath, unitedNationsMembers, 'UnitedNationsMembers')

	for (const [name, runner] of Object.entries(data)) {
		await Wait(delayBetweenRequest)

		const result = NormalizeData(
			await runner(unitedNationsMembers),
			validCountries
		)

		const normalizedResult = NormalizeData(result, validCountries)

		await DataWriter(outputPath, normalizedResult, name)
	}
}

export default ProcessData
