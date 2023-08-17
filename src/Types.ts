export interface IBaseData {
	country: string
}

export interface IRawBaseData extends IBaseData {
	wikipediaTitle: string | null
}

export type IDataSingle<T extends Record<string, any>> = IBaseData & {
	data: T | null
}

export type IData<T extends Record<string, any>> = IDataSingle<T>[]

export type IRawDataSingle<T extends Record<string, any>> = IRawBaseData & {
	data: T | null
}

export type IRawData<T extends Record<string, any>> = IRawDataSingle<T>[]
