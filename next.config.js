/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tuk-cdn.s3.amazonaws.com',
				port: '',
				pathname: '/assets/**',
			},
			{
				protocol: 'https',
				hostname: 'werkerbee.s3.us-west-2.amazonaws.com',
				port: '',
				pathname: '/*',
			},
		],
	},
}

module.exports = nextConfig
