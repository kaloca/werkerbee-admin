'use client'
import { useState } from 'react'
import { KeyedMutator } from 'swr'

import { PulseLoader } from 'react-spinners'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import apiClient from '@/utils/apiClient'

import { Certification } from '@/interfaces/Certification'

interface ListItemProps {
	certification: Certification
	mutate: KeyedMutator<any>
}

const ListItem: React.FC<ListItemProps> = ({ certification, mutate }) => {
	const [edit, setEdit] = useState(false)
	const [loadingEdit, setLoadingEdit] = useState(false)
	const [loadingDelete, setLoadingDelete] = useState(false)
	const [showDeletConfirmation, setShowDeleteConfirmation] = useState(false)
	const [editCertificationValue, setEditCertificationValue] = useState({
		certification: certification.certification,
		organization: certification.organization,
	})

	const updateCertification = async (
		id: string,
		certification: { certification: string; organization: string }
	) => {
		setLoadingEdit(true)
		try {
			const response = await apiClient({
				method: 'put',
				url: `/certification/${id}`,
				token: '',
				data: certification,
			})
			if (response?.status === 200) {
				console.log('Certification edited successfully')
				mutate()
				setEdit(false)
			} else {
				console.error(
					`Error editing certification: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error('Error editing certification:', error.response.data.message)
			//showError(error.response.data.message)
		}
		setLoadingEdit(false)
	}

	const deleteCertification = async (id: string) => {
		setLoadingDelete(true)
		try {
			const response = await apiClient({
				method: 'delete',
				url: `/certification/${id}`,
				token: '',
			})
			if (response?.status === 200) {
				console.log('Certification deleted successfully')
				mutate()
				// setShowDeleteConfirmation(false)
			} else {
				console.error(
					`Error deleting certification: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error(
				'Error deleting certification:',
				error.response.data.message
			)
			//showError(error.response.data.message)
		}
		// setLoadingDelete(false)
	}

	return (
		<li key={certification._id} className='py-4'>
			<div className='flex items-center space-x-4'>
				{!edit ? (
					<div className='flex-1 min-w-0'>
						<p className='text-sm font-medium text-gray-900 truncate capitalize'>
							{certification.certification}
						</p>
						<p className='text-sm text-gray-500 truncate capitalize'>
							{certification.organization}
						</p>
					</div>
				) : (
					<div className='inline-flex w-full'>
						<input
							type='email'
							name='email'
							id='email'
							className='capitalize w-1/2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md'
							value={editCertificationValue.certification}
							placeholder={certification.certification}
							onChange={(e) =>
								setEditCertificationValue({
									...editCertificationValue,
									certification: e.target.value.toLowerCase(),
								})
							}
						/>
						<input
							id='organization-edit'
							name='organization-edit'
							type='text'
							className='ml-1 block w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
							defaultValue={certification.organization}
							value={editCertificationValue.organization}
							onChange={(e) =>
								setEditCertificationValue({
									...editCertificationValue,
									organization: e.target.value,
								})
							}
						/>
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
									onClick={() => deleteCertification(certification._id)}
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
					<>
						<button
							type='button'
							className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							onClick={() =>
								updateCertification(certification._id, editCertificationValue)
							}
						>
							{!loadingEdit ? 'Save' : <PulseLoader size={8} color='white' />}
						</button>
						<button
							type='button'
							className='inline-flex items-center mr-3 px-3 py-2 border-2 border-gray-200 shadow-sm text-base font-medium rounded-md text-indigo-600 bg-gray-100 hover:bg-slate-100 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							onClick={() => setEdit(false)}
						>
							Cancel
						</button>
					</>
				)}
			</div>
		</li>
	)
}

export default ListItem
