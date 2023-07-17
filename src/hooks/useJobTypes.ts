import useSWR from 'swr'

import fetcher from '@/utils/fetcher'
import { BASE_URL } from '@/utils/constants'

import { JobType } from '@/interfaces/JobType'

interface useJobTypesResponse {
	jobTypes: JobType[]
}

const useJobTypes = () => {
	const { data, error, mutate } = useSWR(`${BASE_URL}/jobtypes`, fetcher)

	const isLoading = !error && !data

	return {
		data: data as useJobTypesResponse,
		error,
		isLoading,
		mutate,
	}
}

export default useJobTypes
