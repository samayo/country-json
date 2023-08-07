export interface IBaseData {
	country: string
}

export type IData<T extends Record<string, any>> = (IBaseData & T)[]
