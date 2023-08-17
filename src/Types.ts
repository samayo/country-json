export interface IBaseData {
	country: string
}

export type IDataSingle<T extends Record<string, any>> = IBaseData & {
	data: T | null
}

export type IData<T extends Record<string, any>> = IDataSingle<T>[]
