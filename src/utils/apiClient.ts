import axios from 'axios'

import { BASE_URL } from './constants'

interface apiClientProps {
	url: string
	method: string
	token: string
	data?: any
}

const apiClient = async ({ url, method, token, data }: apiClientProps) => {
	try {
		const response = await axios({
			url: `${BASE_URL}${url}`,
			method: method,
			data: data,
			headers: { Authorization: 'Bearer ' + token },
		})

		return response
	} catch (error) {
		// Handle the error as needed
		//console.error(error)
		throw error
	}
}

export default apiClient
