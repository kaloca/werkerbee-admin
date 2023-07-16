import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import helpers from '@/utils/helpers'

const classNames = helpers.classNames

interface ApproveRejectDropDownProps {
	statusColor: {
		background: string
		text: string
	}
	status: string
	handleStatusChange: (status: 'APPROVED' | 'REJECTED') => void
}
const ApproveRejectDropdown: React.FC<ApproveRejectDropDownProps> = ({
	statusColor,
	status,
	handleStatusChange,
}) => {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			<div>
				<Menu.Button
					className={`${statusColor.background} ${statusColor.text} inline-flex items-center capitalize rounded-full px-2 text-xs font-semibold leading-5`}
				>
					{status}
					<ChevronDownIcon
						className={`-mr-1 h-4 w-5 ${statusColor.text}`}
						aria-hidden='true'
					/>
				</Menu.Button>
				{/* <p
					className={`${statusColor.background} ${statusColor.text} inline-flex capitalize rounded-full px-2 text-xs font-semibold leading-5`}
				>
					{worker.accountStatus.toLocaleLowerCase()}
				</p> */}
			</div>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<div className='py-1'>
						<Menu.Item>
							{({ active }) => (
								<a
									onClick={() => handleStatusChange('APPROVED')}
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'hover:cursor-pointer block px-4 py-2 text-sm'
									)}
								>
									Approve
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									onClick={() => handleStatusChange('REJECTED')}
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'hover:cursor-pointer block px-4 py-2 text-sm'
									)}
								>
									Reject
								</a>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default ApproveRejectDropdown
