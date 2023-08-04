'use client'
import React, { useEffect, useState } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

import { useSnackbar } from './snackbarContext'

const Snackbar: React.FC = () => {
	const { snackbar, hideSnackbar } = useSnackbar()
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (snackbar) {
			setVisible(true)
		}
	}, [snackbar])

	if (!visible) return null

	return (
		<>
			{snackbar?.type == 'error' && (
				<div className='fixed inset-0 flex z-50 justify-center'>
					<div className='max-w-xl '>
						<div className='flex justify-center mt-12'>
							<div className='bg-red-200 shadow rounded-md p-4 flex items-center justify-between space-x-4 transition-all duration-300 ease-in-out transform translate-y-0'>
								<div className='flex items-center space-x-2'>
									{/* Your SVG icon */}
									<p className='text-red-500 font-bold'>Error:</p>
								</div>
								<p className='text-red-500 max-h-20 overflow-scroll no-scrollbar'>
									{snackbar?.message}
								</p>
								<button
									onClick={() => {
										setVisible(false)
										setTimeout(hideSnackbar, 300)
									}}
									className='text-red-500 font-bold'
								>
									Dismiss
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{snackbar?.type == 'success' && (
				<div className='fixed inset-0 flex z-50 justify-center'>
					<div className='rounded-md flex p-4 mt-12 h-min bg-green-50'>
						<div className='flex-shrink-0'>
							<CheckCircleIcon
								className='h-5 w-5 text-green-400'
								aria-hidden='true'
							/>
						</div>
						<div className='ml-3'>
							<p className='text-sm font-medium text-green-800'>
								{snackbar?.message}
							</p>
						</div>
						<div className='ml-auto pl-3'>
							<div className='-mx-1.5 -my-1.5'>
								<button
									type='button'
									className='inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600'
									onClick={() => {
										setVisible(false)
										setTimeout(hideSnackbar, 300)
									}}
								>
									<span className='sr-only'>Dismiss</span>
									<XMarkIcon className='h-5 w-5' aria-hidden='true' />
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Snackbar
