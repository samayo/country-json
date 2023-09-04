export enum IGovernmentConstitutionalForm {
	Provisional = 'Provisional',
	Republic = 'Republic',
	ConstitutionalMonarchy = 'ConstitutionalMonarchy',
	AbsoluteMonarchy = 'AbsoluteMonarchy',
}

export enum IGovernmentHeadOfState {
	NotApplicable = 'NotApplicable',
	Ceremonial = 'Ceremonial',
	Executive = 'Executive',
}

export interface IGovernment {
	constitutionalForm: IGovernmentConstitutionalForm
	headOfState: IGovernmentHeadOfState
}
