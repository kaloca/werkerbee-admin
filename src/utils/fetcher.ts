import axios from 'axios'
import { signOut } from 'next-auth/react'

const fetcher = (url: string, token: string) =>
	axios
		.get(url, { headers: { Authorization: 'Bearer ' + token } })
		.then((res) => res.data)
		.catch(
			(error) =>
				error.response.status == 401 && signOut({ callbackUrl: '/login' })
		)

export default fetcher
