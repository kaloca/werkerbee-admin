'use client'
import { useState } from 'react'

import ListItem from './components/ListItem'
import useWorkers from './hooks/useWorkers'
import WorkerModal from './components/WorkerModal'
import { useRouter } from 'next/navigation'
import useDebounce from '@/hooks/useDebounce'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ListItemSkeleton from './components/ListItemSkeleton'

const numberPerPage = 5

export default function WorkersPage() {
	const router = useRouter()

	const [showWorkerModal, setShowWorkerModal] = useState(false)
	const [selectedWorker, setSelectedWorker] = useState('')
	const [searchParam, setSearchParam] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const debouncedSearchParam = useDebounce(searchParam)

	const { data, error, isLoading, mutate } = useWorkers(
		currentPage,
		numberPerPage,
		...(debouncedSearchParam && debouncedSearchParam.length > 0
			? [debouncedSearchParam]
			: [])
	)

	if (error) return <div>An error has occurred: {error.message}</div>

	const totalPages = Math.ceil(data?.total / numberPerPage)

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			{showWorkerModal && (
				<WorkerModal
					open={showWorkerModal}
					onClose={() => setShowWorkerModal(false)}
					username={selectedWorker}
					mutate={mutate}
				/>
			)}
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-xl font-semibold text-gray-900'>Workers</h1>
					<p className='mt-2 text-sm text-gray-700'>
						Approve, reject or edit worker profiles.
					</p>
				</div>
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
									className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:hidden border-gray-300'
									placeholder='Find Worker'
									value={searchParam}
									onChange={(e) => setSearchParam(e.target.value)}
								/>
								<input
									type='text'
									name='desktop-search-candidate'
									id='desktop-search-candidate'
									className='hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md pl-10 sm:block sm:text-sm border-gray-300'
									placeholder='Find Worker'
									value={searchParam}
									onChange={(e) => setSearchParam(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
					<button
						onClick={() => router.push('/workers/new-worker')}
						type='button'
						className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
					>
						Add Worker
					</button>
				</div>
			</div>
			<div className='mt-8 flex flex-col pb-20'>
				<div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
						<div className='shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
							<table className='min-w-full divide-y divide-gray-300'>
								<thead className='bg-gray-50'>
									<tr>
										<th
											scope='col'
											className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
										>
											Name
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
										>
											Date Created
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
										>
											Location
										</th>
										<th
											scope='col'
											className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
										>
											Status
										</th>
										<th
											scope='col'
											className='relative py-3.5 pl-3 pr-4 sm:pr-6'
										>
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-200 bg-white'>
									{!isLoading &&
										data &&
										data.workers?.map((worker) => (
											<ListItem
												key={worker.username}
												worker={worker}
												onEdit={() => {
													setSelectedWorker(worker.username)
													setShowWorkerModal(true)
												}}
												mutate={mutate}
											/>
										))}
									{isLoading && (
										<>
											<ListItemSkeleton />
											<ListItemSkeleton />
										</>
									)}
								</tbody>
							</table>
							<nav
								className='bg-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
								aria-label='Pagination'
							>
								<div className='hidden sm:block'>
									<p className='text-sm text-gray-700'>
										Showing{' '}
										<span className='font-medium'>
											{data?.workers?.length > 0
												? (currentPage - 1) * numberPerPage + 1
												: 0}
										</span>{' '}
										to{' '}
										<span className='font-medium'>
											{(currentPage - 1) * numberPerPage +
												data?.workers?.length}
										</span>{' '}
										of <span className='font-medium'>{data?.total}</span>{' '}
										results
									</p>
								</div>
								<div className='flex-1 flex justify-between sm:justify-end'>
									<button
										onClick={() =>
											setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
										}
										disabled={currentPage === 1}
										className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
									>
										Previous
									</button>
									<button
										onClick={() => setCurrentPage(currentPage + 1)}
										disabled={currentPage === totalPages}
										className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
									>
										Next
									</button>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
