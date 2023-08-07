enum IAverageHeightMethodology {
	Measured = 'Measured',
	SelfReported = 'SelfReported',
}

interface IAverageHeightBase {
	methodology: IAverageHeightMethodology
}

interface IAverageHeightMaleNull {
	male: null
	female: number
	maleToFemaleRatio: null
}

interface IAverageHeightFemaleNull {
	male: number
	female: null
	maleToFemaleRatio: null
}

interface IAverageHeightAllNull {
	male: null
	female: null
	maleToFemaleRatio: null
}

interface IAverageHeightAll {
	male: number
	female: number
	maleToFemaleRatio: number
}

type IAverageHeight = (
	| IAverageHeightMaleNull
	| IAverageHeightFemaleNull
	| IAverageHeightAllNull
	| IAverageHeightAll
) &
	IAverageHeightBase
