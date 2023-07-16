'use client'
import { useState } from 'react'
import Image from 'next/image'

import { Worker } from '@/interfaces/Worker'

import BlankProfilePic from '@/assets/blank_profile_pic.webp'
import helpers from '@/utils/helpers'
import ApproveRejectDropdown from './ApproveRejectDropdown'
import apiClient from '@/utils/apiClient'
import { KeyedMutator } from 'swr'

const statusColors = {
	APPROVED: { background: 'bg-green-100', text: 'text-green-800' },
	PENDING: { background: 'bg-orange-100', text: 'text-yellow-800' },
	REJECTED: { background: 'bg-red-100', text: 'text-red-800' },
}

interface ListItemProps {
	worker: Worker
	onEdit: () => void
	mutate: KeyedMutator<any>
}

const ListItem: React.FC<ListItemProps> = ({ worker, onEdit, mutate }) => {
	let statusColor = statusColors[worker.accountStatus]
	const [loadingStatus, setLoadingStatus] = useState(false)

	const handleStatusChange = async (status: 'APPROVED' | 'REJECTED') => {
		setLoadingStatus(true)

		try {
			const response = await apiClient({
				method: 'put',
				url: `/admin/worker/${worker.username}/status`,
				token: '',
				data: { status },
			})
			if (response?.status === 200) {
				console.log('Worker profile edited successfully')
				mutate()
				//router.back()
			} else {
				console.error(
					`Error editing worker profile: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error(
				'Error editing worker profile:',
				error.response.data.message
			)
			//showError(error.response.data.message)
		}
		setLoadingStatus(false)
	}

	return (
		<tr key={worker.username}>
			<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
				<div className='flex items-center'>
					<div className='h-10 w-10 flex-shrink-0'>
						<Image
							className='h-10 w-10 rounded-full'
							src={worker.profilePicture || BlankProfilePic}
							width={150}
							height={150}
							alt='profilePicture'
						/>
					</div>
					<div className='ml-4'>
						<div className='font-medium text-gray-900'>{worker.name}</div>
						<div className='text-gray-500'>{worker.email}</div>
					</div>
				</div>
			</td>
			<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
				<div className='text-gray-900'>
					{helpers.formatDate(worker.createdAt)}
				</div>
				<div className='text-gray-500'>{worker.username}</div>
			</td>
			<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
				{worker.address.city}
				{', '}
				{worker.address.state}
			</td>
			<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
				<ApproveRejectDropdown
					statusColor={statusColor}
					status={worker.accountStatus.toLocaleLowerCase()}
					handleStatusChange={handleStatusChange}
				/>
			</td>
			<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
				<a
					onClick={onEdit}
					className='hover:cursor-pointer text-indigo-600 hover:text-indigo-900'
				>
					Edit<span className='sr-only'>, {worker.name}</span>
				</a>
			</td>
		</tr>
	)
}

export default ListItem
