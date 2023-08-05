'use client'
import { useState } from 'react'
import {
	BarsArrowUpIcon,
	ChevronDownIcon,
	MagnifyingGlassIcon,
	PencilSquareIcon,
	TrashIcon,
} from '@heroicons/react/24/outline'

import apiClient from '@/utils/apiClient'

import useJobTypes from '@/hooks/useJobTypes'
import ListItem from './components/ListItem'
import NewJobTypeModal from './components/NewJobTypeModal'

export default function JobTypesPage() {
	const { data, isLoading, mutate } = useJobTypes()

	const [showNewJobTypeModal, setShowNewJobTypeModal] = useState(false)
	const [businessTypeFilter, setBusinessTypeFilter] = useState<
		'All' | 'Business' | 'Hotel'
	>('All')
	const [jobTypesSearchFilter, setJobTypesSearchFilter] = useState('')

	return (
		<div className='md:pl-20 md:pr-40 xs:pl-4 xs:pr-4'>
			{showNewJobTypeModal && (
				<NewJobTypeModal mutate={mutate} onClose={setShowNewJobTypeModal} />
			)}
			<div className='pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>
					Job Types
				</h3>

				<div className='inline-flex items-center'>
					<div className='border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
						<div className='mt-3 sm:mt-0 sm:ml-4'>
							<label htmlFor='mobile-search-candidate' className='sr-only'>
								Search
							</label>
							<label htmlFor='desktop-search-candidate' className='sr-only'>
								Search
							</label>
							<div className='flex rounded-md shadow-sm'>
								<div className='relative flex-grow focus-within:z-10'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<MagnifyingGlassIcon
											className='h-5 w-5 text-gray-400'
											aria-hidden='true'
										/>
									</div>
									<input
										type='text'
										name='mobile-search-candidate'
										id='mobile-search-candidate'
										className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300'
										placeholder='Search Job Types'
										value={jobTypesSearchFilter}
										onChange={(e) => setJobTypesSearchFilter(e.target.value)}
									/>
									<input
										type='text'
										name='desktop-search-candidate'
										id='desktop-search-candidate'
										className='hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300'
										placeholder='Search Job Types'
										value={jobTypesSearchFilter}
										onChange={(e) => setJobTypesSearchFilter(e.target.value)}
									/>
								</div>
								<select
									id='businessTypeFilter'
									name='businessTypeFilter'
									className='-ml-px relative w-32 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
									value={businessTypeFilter}
									onChange={(e) => setBusinessTypeFilter(e.target.value as any)}
								>
									<option>All</option>
									<option>Restaurant</option>
									<option>Hotel</option>
								</select>
							</div>
						</div>
					</div>
					<div className='mt-3 sm:mt-0 sm:ml-4'>
						<button
							type='button'
							onClick={() => setShowNewJobTypeModal(true)}
							className='inline-flex items-center ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Create new
						</button>
					</div>
				</div>
			</div>
			<div>
				<div className='flow-root mt-6'>
					<ul role='list' className='-my-5 divide-y divide-gray-200'>
						{data?.jobTypes
							.filter(
								(jobType) =>
									businessTypeFilter == 'All' ||
									jobType.businessType == businessTypeFilter.toUpperCase()
							)
							.filter((jobType) => jobType.type.includes(jobTypesSearchFilter))
							.map((jobType) => (
								<ListItem key={jobType._id} jobType={jobType} mutate={mutate} />
							))}
					</ul>
				</div>
			</div>
		</div>
	)
}
