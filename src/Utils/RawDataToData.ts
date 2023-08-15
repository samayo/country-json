import { IData, IRawData } from '../Types'

const RawDataToData = <T>(rawData: IRawData<T>): IData<T> =>
	rawData.map(row => ({
		country: row.country,
		data: structuredClone(row.data),
	}))

export default RawDataToData
