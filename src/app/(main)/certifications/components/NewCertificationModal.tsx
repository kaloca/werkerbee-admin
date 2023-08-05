'use client'
import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { KeyedMutator } from 'swr'

import { Dialog, Transition } from '@headlessui/react'
import {
	DocumentPlusIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

import apiClient from '@/utils/apiClient'
import { PulseLoader } from 'react-spinners'

interface NewCertificationModalProps {
	mutate: KeyedMutator<any>
	onClose: Dispatch<SetStateAction<boolean>>
}

const NewCertificationModal: React.FC<NewCertificationModalProps> = ({
	mutate,
	onClose,
}) => {
	const [newCertificationValue, setNewCertificationValue] = useState({
		certification: '',
		organization: '',
	})
	const [open, setOpen] = useState(true)
	const [loading, setLoading] = useState(false)
	const [showError, setShowError] = useState(false)

	const cancelButtonRef = useRef(null)

	const createCertification = async (certification: {
		certification: string
		organization: string
	}) => {
		setLoading(true)
		try {
			const response = await apiClient({
				method: 'post',
				url: `/certification`,
				token: '',
				data: certification,
			})
			if (response?.status === 201) {
				console.log('Certification created successfully')
				mutate()
				setOpen(false)
				onClose(false)
			} else {
				setShowError(true)
				console.error(
					`Error creating certification: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			setShowError(true)

			console.error(
				'Error creating certification:',
				error.response.data.message
			)
			//showError(error.response.data.message)
		}
		setLoading(false)
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				initialFocus={cancelButtonRef}
				onClose={() => {
					setOpen(false)
					onClose(false)
				}}
			>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						{/* Main Div */}
						<div className='relative bg-white inline-block align-bottom rounded-lg px-10 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle '>
							<div className='sm:flex sm:items-start'>
								<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10'>
									<DocumentPlusIcon
										className='h-6 w-6 text-indigo-600'
										aria-hidden='true'
									/>
								</div>
								<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
									<Dialog.Title
										as='h3'
										className='mb-4 mt-2 text-lg leading-6 font-medium text-gray-900'
									>
										New Certification
									</Dialog.Title>
									<div className='flex flex-col'>
										<div className='flex flex-col space-y-2'>
											<input
												type='text'
												name='certification'
												id='certification'
												className='capitalize w-80 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md'
												value={newCertificationValue.certification}
												placeholder='Certification Name'
												onChange={(e) =>
													setNewCertificationValue({
														...newCertificationValue,
														certification: e.target.value,
													})
												}
											/>
											<input
												type='text'
												name='organization'
												id='organization'
												className='capitalize w-80 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md'
												value={newCertificationValue.organization}
												placeholder='Organization Name'
												onChange={(e) =>
													setNewCertificationValue({
														...newCertificationValue,
														organization: e.target.value,
													})
												}
											/>
										</div>
										{showError && (
											<span className='mt-2 text-sm text-red-500'>
												Certification already exists
											</span>
										)}
									</div>
								</div>
							</div>
							<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
								<button
									type='button'
									className='inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
									onClick={() => createCertification(newCertificationValue)}
								>
									{!loading ? (
										'Create'
									) : (
										<PulseLoader
											className='h-6 items-center'
											size={4}
											color='white'
										/>
									)}
								</button>
								<button
									type='button'
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
									ref={cancelButtonRef}
									onClick={() => {
										setOpen(false)
										onClose(false)
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default NewCertificationModal
