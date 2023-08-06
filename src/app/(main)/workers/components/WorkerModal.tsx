import { Fragment, useEffect, useState } from 'react'
import { KeyedMutator } from 'swr'

import { Dialog, Transition } from '@headlessui/react'
import { PulseLoader } from 'react-spinners'

import apiClient from '@/utils/apiClient'

import useWorker from '../hooks/useWorker'

import Input from './Input'
import JobTypesInput from './JobTypesInput'
import CertificationInput from './CertificationsInput'

export interface WorkerForm {
	name: string
	street: string
	city: string
	country: string
	state: string
	zip: string
	jobTypes: string[]
	certifications: string[]
}

interface WorkerModalProps {
	open: boolean
	onClose: () => void
	username: string
	mutate: KeyedMutator<any>
}

const WorkerModal: React.FC<WorkerModalProps> = ({
	open,
	onClose,
	username,
	mutate,
}) => {
	const { data: worker, isLoading, mutate: mutateWorker } = useWorker(username)

	const [loadingSave, setLoadingSave] = useState(false)
	const [formData, setFormData] = useState<WorkerForm>({
		name: ' ',
		street: ' ',
		city: ' ',
		country: ' ',
		state: ' ',
		zip: ' ',
		jobTypes: [],
		certifications: [],
	})

	useEffect(() => {
		mutateWorker()
	}, [open, mutateWorker])

	useEffect(() => {
		if (!isLoading && worker) {
			setFormData({
				name: worker.name,
				street: worker.address.street,
				city: worker.address.city,
				country: worker.address.country,
				state: worker.address.state,
				zip: worker.address.zip,
				jobTypes: worker.jobTypes,
				certifications: worker.certifications as any,
			})
		}
	}, [isLoading, worker, open])

	const handleSaveWorker = async () => {
		setLoadingSave(true)
		if (Object.values(formData).some((item) => item.value === '')) {
			//showError('Please fill all job posting fields')
			return
		}

		try {
			const response = await apiClient({
				method: 'put',
				url: `/admin/worker/${username}`,
				token: '',
				data: {
					name: formData.name,
					address: {
						street: formData.street,
						city: formData.city,
						country: formData.country,
						state: formData.state,
						zip: formData.zip,
					},
					jobTypes: formData.jobTypes,
					certifications: formData.certifications,
				},
			})
			if (response?.status === 200) {
				console.log('Worker profile edited successfully')
				onClose()
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
		setLoadingSave(false)
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				onClose={onClose}
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
						<div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
							<div className='mt-5 sm:mt-6'>
								<div className='mt-5 md:mt-0 md:col-span-2'>
									<form action='#' method='POST'>
										<div className='grid grid-cols-6 gap-6'>
											<Input
												name='name'
												type='text'
												big
												formData={formData}
												setFormData={setFormData}
											/>

											<JobTypesInput
												onChange={(value) => {
													let currentTypes = formData.jobTypes
													if (currentTypes.includes(value)) {
														currentTypes = currentTypes.filter(
															(type) => type != value
														)
													} else {
														currentTypes.push(value)
													}
													setFormData({
														...formData,
														jobTypes: currentTypes,
													})
												}}
												placeholder='Select '
												inputName='jobTypes'
												showError={{}}
												error='Test'
												label={'Job Types'}
												value={formData.jobTypes}
											/>

											<div className='col-span-10 sm:col-span-6'>
												{worker?.certifications && (
													<CertificationInput
														formData={formData}
														setFormData={setFormData}
														workerCertifications={
															worker.certifications as string[]
														}
													/>
												)}
											</div>

											<Input
												name='street'
												label='Street Name'
												type='text'
												big
												formData={formData}
												setFormData={setFormData}
											/>
											{/* <div className='col-span-6 sm:col-span-4'>
													<label
														htmlFor='email-address'
														className='block text-sm font-medium text-gray-700'
													>
														Email address
													</label>
													<input
														type='text'
														name='email-address'
														id='email-address'
														autoComplete='email'
														className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
													/>
												</div> */}

											<Input
												name='country'
												type='text'
												formData={formData}
												setFormData={setFormData}
											/>

											<Input
												name='city'
												type='text'
												formData={formData}
												setFormData={setFormData}
											/>

											<Input
												name='state'
												type='text'
												formData={formData}
												setFormData={setFormData}
											/>

											<Input
												name='zip'
												label='Zip Code'
												type='text'
												formData={formData}
												setFormData={setFormData}
											/>
										</div>
									</form>
								</div>
								<div className=' inline-flex w-full'>
									<button
										type='button'
										className='mt-5 inline-flex justify-center w-full mr-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm border border-indigo-500'
										onClick={onClose}
									>
										Cancel
									</button>
									<button
										type='button'
										disabled={loadingSave}
										className={`${
											loadingSave && ''
										} mt-5 inline-flex justify-center items-center w-full ml-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
										onClick={handleSaveWorker}
									>
										{!loadingSave ? (
											'Save'
										) : (
											<PulseLoader size={4} color='white' />
										)}
									</button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default WorkerModal
