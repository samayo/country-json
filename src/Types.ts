interface IBaseData {
	country: string
}

interface ICountries {}

interface ICountriesName {}

interface IGS1Code {}

interface ICallingCodes {}

interface ICapitalCity {}

interface ICities {}

interface IContinent {}

interface ICoastline {}

interface IArea {}

interface IISO4217 {}

interface ICurrencySymbol {}

interface ICurrencyName {}

interface IccTLD {}

interface IAverageElevation {}

interface IFlag {}

interface IGeoCoordinate {}

interface IIndependence {}

interface ILandlocked {}

interface ILanguages {}

interface ILifeExpectancy {}

interface INationalDishes {}

interface INationalSymbol {}

interface IPopulationDensity {}

interface IPopulation {}

interface IRegion {}

interface IReligion {}

interface IYearlyAverageTemperature {}

interface INationalSport {}

type IData<T extends Record<string, any>> = (IBaseData & T)[]
