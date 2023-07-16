import { SetStateAction } from 'react'
import { WorkerForm } from './WorkerModal'

interface InputProps {
	name: keyof WorkerForm
	label?: string
	type: string
	big?: boolean
	formData: WorkerForm
	setFormData: (value: SetStateAction<WorkerForm>) => void
}

const Input: React.FC<InputProps> = ({
	name,
	label,
	type,
	big,
	formData,
	setFormData,
}) => {
	return (
		<div
			className={big ? 'col-span-10 sm:col-span-6' : 'col-span-6 sm:col-span-3'}
		>
			<label
				htmlFor='name'
				className='block text-sm font-medium text-gray-700 capitalize'
			>
				{label || name}
			</label>
			<input
				type={type}
				name={name.toLowerCase()}
				id={name.toLowerCase()}
				// autoComplete='full-name'
				value={formData[name]}
				onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
				className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
			/>
		</div>
	)
}

export default Input
