import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { BASE_URL } from '@/utils/constants'

const useJobTypes = () => {
	const { data, error, mutate } = useSWR(`${BASE_URL}/job-types`, fetcher)

	const isLoading = !error && !data

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useJobTypes
