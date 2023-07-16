import React from 'react'
import Image from 'next/image'

import { Worker } from '@/interfaces/Worker'

import BlankProfilePic from '@/assets/blank_profile_pic.webp'
import helpers from '@/utils/helpers'

const statusColors = {
	APPROVED: { background: 'bg-green-100', text: 'text-green-800' },
	PENDING: { background: 'bg-orange-100', text: 'text-yellow-800' },
	REJECTED: { background: 'bg-red-100', text: 'text-red-800' },
}

interface ListItemProps {
	worker: Worker
}

const ListItem: React.FC<ListItemProps> = ({ worker }) => {
	let statusColor = statusColors[worker.accountStatus]

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
				<p
					className={`${statusColor.background} ${statusColor.text} inline-flex capitalize rounded-full px-2 text-xs font-semibold leading-5`}
				>
					{worker.accountStatus.toLocaleLowerCase()}
				</p>
			</td>
			<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
				<a href='#' className='text-indigo-600 hover:text-indigo-900'>
					Edit<span className='sr-only'>, {worker.name}</span>
				</a>
			</td>
		</tr>
	)
}

export default ListItem
