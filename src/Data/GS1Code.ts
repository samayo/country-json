interface IGS1CodeRange {
	isRange: true

	/**
	 * Inclusive
	 */
	start: number

	/**
	 * Inclusive
	 */
	end: number
}

interface IGS1CodeSingle {
	isRange: false
	number: number
}

export type IGS1Code = (IGS1CodeSingle | IGS1CodeRange)[]
