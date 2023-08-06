import { Certification } from './Certification'
import { JobType } from './JobType'
import { Address, BankAccount } from './UserData'
export interface Experience {
	_id: string
	company: string
	jobType: string
	startDate: string
	endDate: string
}
export interface Worker {
	_id: string
	name: string
	username: string
	bio: string
	phoneNumber: string
	email: string
	location: {
		coordinates: [number, number]
	}
	address: Address
	billingAddress?: Address
	bankInfo?: BankAccount
	ssn: string
	birthday: Date
	rating: number
	profilePicture: string
	certifications?: string[] | Certification[]
	jobTypes?: string[]
	jobTypesIds: string[] | JobType[]
	experiences?: Experience[]
	accountStatus: 'APPROVED' | 'PENDING' | 'REJECTED'
	createdAt: string
	updatedAt: string
	hashedPassword: string
}
