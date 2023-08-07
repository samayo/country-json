export enum IGovernmentConstitutionalForm {
	Provisional,
	Republic,
	ConstitutionalMonarchy,
	AbsoluteMonarchy,
}

export enum IGovernmentHeadOfState {
	NotApplicable,
	Ceremonial,
	Executive,
}

export interface IGovernment {
	constitutionalForm: IGovernmentConstitutionalForm
	headOfState: IGovernmentHeadOfState
}
