import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { parse } from 'cookie'

import { BASE_URL } from '@/utils/constants'

interface UserWithToken extends User {
	token: string
	type: 'worker' | 'company'
	username: string
	id: string
}

export default NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Username',
					type: 'text',
					placeholder: 'user@email.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied

				const res = await fetch(`${BASE_URL}/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				})
				if (res.ok) {
					const data = await res.json()
					const setCookieHeader = res.headers.get('Set-Cookie')
					if (setCookieHeader) {
						const parsedCookies = parse(setCookieHeader)
						const authToken = parsedCookies['auth']
						if (authToken) {
							return { token: authToken, ...data } as UserWithToken
						}
					}
				}
				return null
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user }
		},
		async session({ session, token, user }) {
			session.user = token as any
			return session
		},
	},
	pages: {
		signIn: '/login',
		signOut: '/jobs',
	},
})
