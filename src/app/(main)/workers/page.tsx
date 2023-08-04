'use client'
import { useState } from 'react'

import ListItem from './components/ListItem'
import useWorkers from './hooks/useWorkers'
import WorkerModal from './components/WorkerModal'
import { useRouter } from 'next/navigation'

export default function WorkersPage() {
	const router = useRouter()

	const [showWorkerModal, setShowWorkerModal] = useState(false)
	const [selectedWorker, setSelectedWorker] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const { data, error, isLoading, mutate } = useWorkers(currentPage, 10)

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>An error has occurred: {error.message}</div>

	const totalPages = Math.ceil(data?.total / 10)

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
						<div className='shadow ring-1 ring-black ring-opacity-5 md:rounded-lg pb-20'>
							<table className='min-w-full divide-y divide-gray-300 pb-20 '>
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
									{data &&
										data.workers.map((worker) => (
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
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{/* <div>
				<button
					onClick={() =>
						setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
					}
					disabled={currentPage === 1}
				>
					Previous
				</button>

				{Array.from({ length: totalPages }, (_, index) => index + 1).map(
					(page) => (
						<button
							key={page + 1}
							onClick={() => setCurrentPage(page + 1)}
							disabled={currentPage === page + 1}
						>
							{page + 1}
						</button>
					)
				)}

				<button
					onClick={() =>
						setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div> */}
		</div>
	)
}
