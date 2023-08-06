'use client'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Combobox } from '@headlessui/react'

import helpers from '@/utils/helpers'
import useCertifications from '@/hooks/useCertifications'

import { Certification } from '@/interfaces/Certification'
import { WorkerForm } from './WorkerModal'
import { CreateWorkerForm } from '../new-worker/page'

const people = [
	{ id: 1, name: 'Leslie Alexander' },
	// More users...
]

const classNames = helpers.classNames

interface CertificationsInputProps {
	formData: WorkerForm | CreateWorkerForm
	setFormData:
		| Dispatch<SetStateAction<WorkerForm>>
		| Dispatch<SetStateAction<CreateWorkerForm>>
	workerCertifications?: string[]
	showLabel?: boolean
}

const CertifiicationsInput: React.FC<CertificationsInputProps> = ({
	formData,
	setFormData,
	workerCertifications,
	showLabel = true,
}) => {
	const [query, setQuery] = useState('')

	const { data: certifications, isLoading } = useCertifications()

	const [selectedCertifications, setSelectedCertifications] = useState<
		string[]
	>(workerCertifications ?? [])

	const [showDropdown, setShowDropdown] = useState(false)

	useEffect(() => {
		setFormData({
			...(formData as any),
			certifications: selectedCertifications,
		})
	}, [selectedCertifications])

	useEffect(() => {
		if (workerCertifications) setSelectedCertifications(workerCertifications)
	}, [workerCertifications])

	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false)
			}
		}

		window.addEventListener('mousedown', handleClickOutside)

		return () => {
			window.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const filteredPeople =
		query === ''
			? certifications
			: certifications?.filter((certification) => {
					return (
						certification.certification
							.toLowerCase()
							.includes(query.toLowerCase()) ||
						certification.organization
							.toLowerCase()
							.includes(query.toLowerCase())
					)
			  })

	return (
		<Combobox as='div' ref={dropdownRef}>
			{showLabel && (
				<Combobox.Label className='block text-sm font-medium text-gray-700'>
					Certifications
				</Combobox.Label>
			)}
			<div className='relative mt-1'>
				<Combobox.Input
					className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
					onChange={(event) => {
						setShowDropdown(true)
						setQuery(event.target.value)
					}}
					onClick={() => setShowDropdown(true)}
					displayValue={(person: any) => person.name}
					placeholder='Search Certifications'
				/>
				<Combobox.Button
					onClick={() => setShowDropdown(!showDropdown)}
					className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'
				>
					<ChevronUpDownIcon
						className='h-5 w-5 text-gray-400'
						aria-hidden='true'
					/>
				</Combobox.Button>

				{showDropdown && filteredPeople && filteredPeople.length > 0 && (
					<div className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{filteredPeople?.map((c) => (
							<div
								key={c._id}
								className={`${
									selectedCertifications.includes(c._id) &&
									'bg-indigo-200 text-indigo-600 hover:text-white'
								} relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white text-gray-900`}
								onClick={() => {
									if (selectedCertifications.includes(c._id)) {
										setSelectedCertifications(
											selectedCertifications.filter((id) => id != c._id)
										)
									} else {
										setSelectedCertifications([
											...selectedCertifications,
											c._id,
										])
									}
								}}
							>
								{
									<>
										<span
											className={classNames(
												'block truncate',
												selectedCertifications.includes(c._id) &&
													'font-semibold'
											)}
										>
											<span className='font-semibold'>{c.organization}</span>
											{' - '}
											{c.certification}
										</span>

										{selectedCertifications.includes(c._id) && (
											<span
												className={classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4'
												)}
											>
												<CheckIcon className='h-5 w-5' aria-hidden='true' />
											</span>
										)}
									</>
								}
							</div>
						))}
					</div>
				)}
			</div>
		</Combobox>
	)
}

export default CertifiicationsInput
