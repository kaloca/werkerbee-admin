'use client'

import React, { useState } from 'react'

import helpers from '@/utils/helpers'

import useJobTypes from '../hooks/useJobTypes'

const CheckedBox = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className='icon icon-tabler icon-tabler-square-check'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		strokeWidth='1'
		stroke='currentColor'
		fill='none'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
		<path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'></path>
		<path d='M9 12l2 2l4 -4'></path>
	</svg>
)

const EmptyBox = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className='icon icon-tabler icon-tabler-square'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		strokeWidth='1'
		stroke='currentColor'
		fill='none'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
		<path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'></path>
	</svg>
)

interface JobTypesInputProps {
	onChange: (e: any) => void
	placeholder: string
	inputName: string
	showError: Record<string, any>
	error: string
	label: string
	value: string[]
}

const JobTypesInput: React.FC<JobTypesInputProps> = ({
	onChange,
	placeholder,
	inputName,
	showError,
	error,
	label,
	value,
}) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const { data, isLoading, error: loadingError } = useJobTypes()
	const [jobTypes, setJobTypes] = useState()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (loadingError) {
		return <div>Error: {loadingError.message}</div>
	}

	const fetchedJobTypes = data.types.map((jobType: string) => ({
		type: jobType,
		selected: false,
	}))

	return (
		<div className='w-min'>
			<label className='block text-sm font-medium text-gray-700 capitalize'>
				{label}
			</label>
			<div
				onClick={() => setShowDropdown(!showDropdown)}
				className={` w-44 p-3 mt-2 bg-white border rounded ${
					showError[inputName] ? 'border-red-400' : 'border-gray-200'
				} text-sm font-medium leading-none text-gray-800 flex flex-row justify-between items-center hover:cursor-pointer`}

				// name={inputName}
				// value={value}
			>
				<p>
					{value.length == 0
						? placeholder
						: helpers.formatArrayToString(value, 20)}
				</p>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='icon icon-tabler icon-tabler-select'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					strokeWidth='2'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
					{/* <path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'></path> */}
					<path d='M9 11l3 3l3 -3'></path>
				</svg>
			</div>
			{showDropdown && (
				<div className='flex flex-col w-44 border border-gray-200'>
					{fetchedJobTypes.map((jobType: any) => (
						<div
							key={jobType.type}
							className=' px-3 py-2 hover:bg-slate-100 flex flex-row justify-between'
							onClick={() => {
								//setShowDropdown(false)
								onChange(jobType.type)
							}}
						>
							<p className=' first-letter:capitalize'>{jobType.type}</p>
							{value.includes(jobType.type) ? <CheckedBox /> : <EmptyBox />}
						</div>
					))}
				</div>
			)}
			{/* <div className='h-8'>
				{showError[inputName] && (
					<p className='text-red-600 text-xs'>{error}</p>
				)}
			</div> */}
		</div>
	)
}

export default JobTypesInput
