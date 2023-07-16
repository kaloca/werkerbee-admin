process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY as string
export const BASE_URL =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:3000'
		: 'https://werkerbeeapi.onrender.com'
