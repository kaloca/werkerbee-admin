'use client'
import { useState } from 'react'
import { KeyedMutator } from 'swr'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import apiClient from '@/utils/apiClient'

import { JobType } from '@/interfaces/JobType'
import { PulseLoader } from 'react-spinners'

interface ListItemProps {
	jobType: JobType
	mutate: KeyedMutator<any>
}

const ListItem: React.FC<ListItemProps> = ({ jobType, mutate }) => {
	const [edit, setEdit] = useState(false)
	const [loadingEdit, setLoadingEdit] = useState(false)
	const [loadingDelete, setLoadingDelete] = useState(false)
	const [showDeletConfirmation, setShowDeleteConfirmation] = useState(false)
	const [editJobTypeValue, setEditJobTypeValue] = useState({
		type: jobType.type,
		businessType: jobType.businessType,
	})

	const updateJobType = async (
		id: string,
		jobType: { type: string; businessType: string }
	) => {
		setLoadingEdit(true)
		try {
			const response = await apiClient({
				method: 'put',
				url: `/job-types/${id}`,
				token: '',
				data: jobType,
			})
			if (response?.status === 200) {
				console.log('Job type edited successfully')
				mutate()
				setEdit(false)
			} else {
				console.error(
					`Error editing job type: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error('Error editing job type:', error.response.data.message)
			//showError(error.response.data.message)
		}
		setLoadingEdit(false)
	}

	const deleteJobType = async (id: string) => {
		setLoadingDelete(true)
		try {
			const response = await apiClient({
				method: 'delete',
				url: `/job-types/${id}`,
				token: '',
			})
			if (response?.status === 200) {
				console.log('Job type deleted successfully')
				mutate()
				// setShowDeleteConfirmation(false)
			} else {
				console.error(
					`Error editing job type: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error('Error editing job type:', error.response.data.message)
			//showError(error.response.data.message)
		}
		// setLoadingDelete(false)
	}

	return (
		<li key={jobType._id} className='py-4'>
			<div className='flex items-center space-x-4'>
				{!edit ? (
					<div className='flex-1 min-w-0'>
						<p className='text-sm font-medium text-gray-900 truncate capitalize'>
							{jobType.type}
						</p>
						<p className='text-sm text-gray-500 truncate capitalize'>
							{jobType.businessType.toLowerCase()}
						</p>
					</div>
				) : (
					<div className='inline-flex'>
						<input
							type='email'
							name='email'
							id='email'
							className='capitalize w-40 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md'
							value={editJobTypeValue.type}
							placeholder={jobType.type}
							onChange={(e) =>
								setEditJobTypeValue({
									...editJobTypeValue,
									type: e.target.value.toLowerCase(),
								})
							}
						/>
						<select
							id='business-type-edit'
							name='business-type-edit'
							className='ml-1 block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
							defaultValue={jobType.businessType.toLowerCase()}
							value={editJobTypeValue.businessType.toLowerCase()}
							onChange={(e) =>
								setEditJobTypeValue({
									...editJobTypeValue,
									businessType: e.target.value.toUpperCase(),
								})
							}
						>
							<option className='capitalize'>restaurant</option>
							<option className='capitalize'>hotel</option>
						</select>
					</div>
				)}
				{!edit ? (
					<div className='inline-flex'>
						{!showDeletConfirmation ? (
							<div className='inline-flex'>
								<button
									type='button'
									className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									onClick={() => setEdit(true)}
								>
									<PencilSquareIcon className='h-5 w-5' aria-hidden='true' />
								</button>
								<div
									onClick={() => setShowDeleteConfirmation(true)}
									className='p-2 hover:bg-white hover:cursor-pointer rounded-lg'
								>
									<TrashIcon className='h-6 text-red-600' />
								</div>
							</div>
						) : (
							<div className='inline-flex'>
								<button
									type='button'
									className='mr-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-base rounded-md text-indigo-600 bg-white hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									onClick={() => setShowDeleteConfirmation(false)}
								>
									Cancel
								</button>
								<button
									type='button'
									className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-base rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
									onClick={() => deleteJobType(jobType._id)}
								>
									{!loadingDelete ? (
										'Delete'
									) : (
										<PulseLoader size={6} color='white' />
									)}
								</button>
							</div>
						)}
					</div>
				) : (
					<div className='inline-flex w-full justify-between items-center'>
						<button
							type='button'
							className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							onClick={() => updateJobType(jobType._id, editJobTypeValue)}
						>
							{!loadingEdit ? 'Save' : <PulseLoader size={8} color='white' />}
						</button>
						<button
							type='button'
							className='inline-flex items-center mr-3 px-3 py-2 border-2 border-gray-200 shadow-sm text-base font-medium rounded-md text-indigo-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							onClick={() => setEdit(false)}
						>
							Cancel
						</button>
					</div>
				)}
			</div>
		</li>
	)
}

export default ListItem
