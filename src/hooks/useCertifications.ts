import useSWR from 'swr'

import fetcher from '@/utils/fetcher'
import { BASE_URL } from '@/utils/constants'

import { Certification } from '@/interfaces/Certification'

type useCertificationsResponse = Certification[] | null

const useCertifications = () => {
	const { data, error, mutate } = useSWR(`${BASE_URL}/certification`, fetcher)

	const isLoading = !error && !data

	return {
		data: data as useCertificationsResponse,
		error,
		isLoading,
		mutate,
	}
}

export default useCertifications
