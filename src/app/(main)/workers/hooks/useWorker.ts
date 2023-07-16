import useSWR from 'swr'

import fetcher from '@/utils/fetcher'
import { BASE_URL } from '@/utils/constants'

import { Worker } from '@/interfaces/Worker'

interface UseWorkerResponse {
	worker: Worker
}

const useWorker = (username: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/admin/worker/${username}`,
		fetcher
	)

	return {
		data: data?.worker as Worker,
		error,
		isLoading,
		mutate,
	}
}

export default useWorker
