interface IBaseData {
	country: string
}

interface IISO3166Data {
	alpha2: string
	alpha3: string
	numeric: string
}

enum IAverageHeightDataMethodology {
	Measured = 'Measured',
	SelfReported = 'SelfReported',
}

interface IAverageHeightDataBase {
	methodology: IAverageHeightDataMethodology
}

interface IAverageHeightDataMaleNull {
	male: null
	female: number
	maleToFemaleRatio: null
}

interface IAverageHeightDataFemaleNull {
	male: number
	female: null
	maleToFemaleRatio: null
}

interface IAverageHeightDataAllNull {
	male: null
	female: null
	maleToFemaleRatio: null
}

interface IAverageHeightDataAll {
	male: number
	female: number
	maleToFemaleRatio: number
}

type IAverageHeightData = (
	| IAverageHeightDataMaleNull
	| IAverageHeightDataFemaleNull
	| IAverageHeightDataAllNull
	| IAverageHeightDataAll
) &
	IAverageHeightDataBase

interface ICountriesData {}

interface ICountriesNameData {}

interface IGS1CodeData {}

interface ICallingCodesData {}

interface ICapitalCityData {}

interface ICitiesData {}

interface IContinentData {}

interface ICoastlineData {}

interface IAreaData {}

interface IISO4217Data {}

interface ICurrencySymbolData {}

interface ICurrencyNameData {}

interface IccTLDData {}

interface IAverageElevationData {}

interface IFlagData {}

interface IGeoCoordinateData {}

interface IIndependenceData {}

interface ILandlockedData {}

interface ILanguagesData {}

interface ILifeExpectancyData {}

interface INationalDishesData {}

interface INationalSymbolData {}

interface IPopulationDensityData {}

interface IPopulationData {}

interface IRegionData {}

interface IReligionData {}

interface IYearlyAverageTemperatureData {}

interface INationalSportData {}

type IData<T extends Record<string, any>> = (IBaseData & T)[]
