export interface INationalSports {
	nationalSports: (
		| {
				name: string
				isOfficial: false
				yearDefinedAsNationalSport?: never
		  }
		| {
				name: string
				isOfficial: true
				yearDefinedAsNationalSport: number
		  }
	)[]
}
