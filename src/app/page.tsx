'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-10'>
			<h1>Werkerbee Admin</h1>
			<button onClick={() => router.push('/dashboard')}>Start</button>
		</main>
	)
}
