import useSWR from 'swr'

import fetcher from '@/utils/fetcher'
import { BASE_URL } from '@/utils/constants'

import { Worker } from '@/interfaces/Worker'

interface UseWorkersResponse {
	workers: Worker[]
	total: number
	page: number
	limit: number
}

const useWorkers = (page: number, limit: number = 10, search?: string) => {
	const queryParams = [
		`page=${page}`,
		`limit=${limit}`,
		...(search ? [`search=${encodeURIComponent(search)}`] : []),
	].join('&')

	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/admin/workers?${queryParams}`,
		fetcher
	)

	return {
		data: data as UseWorkersResponse,
		error,
		isLoading,
		mutate,
	}
}

export default useWorkers
