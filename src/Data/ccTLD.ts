export interface IccTLD {
	tld: string
	registry: string
	IDN: boolean | null | string
	DNSSEC: boolean | null | 'Partial'
	SLD: boolean | null
	IPv6: boolean | null
}
