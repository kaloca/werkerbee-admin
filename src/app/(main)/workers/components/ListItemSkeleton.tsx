import Image from 'next/image'

import BlankProfilePic from '@/assets/blank_profile_pic.webp'
import { Skeleton } from '@mui/material'

const ListItemSkeleton = () => {
	return (
		<tr>
			<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
				<div className='flex items-center'>
					<div className='h-10 w-10 flex-shrink-0'>
						<Image
							className='h-10 w-10 rounded-full'
							src={BlankProfilePic}
							width={150}
							height={150}
							alt='profilePicture'
						/>
					</div>
					<div className='ml-4'>
						<Skeleton className='h-8 w-32' height={30} />
					</div>
				</div>
			</td>
			<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
				<div className='text-gray-900'>
					<Skeleton className='h-4 w-20' />
				</div>
				<div className='text-gray-500'>
					<Skeleton className='h-4 w-14' />
				</div>
			</td>
			<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
				<Skeleton className='h-6 w-20' />
			</td>
			<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
				<Skeleton className='h-4 w-20' />
			</td>
			<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
				<Skeleton className='h-8 w-10' height={40} />
			</td>
		</tr>
	)
}

export default ListItemSkeleton
