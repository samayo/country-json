interface IBaseData {
	country: string
}

interface IISO3166Data {
	alpha2: string
	alpha3: string
	numeric: string
}

type IData<T extends Record<string, any>> = (IBaseData & T)[]
