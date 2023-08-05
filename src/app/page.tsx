'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	return (
		<main className='flex min-h-screen text-2xl font-semibold flex-col items-center justify-start p-10'>
			<h1>Werkerbee Admin</h1>
			<button
				className='px-4	mt-2 py-2 text-sm rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-300 hover:cursor-pointer'
				onClick={() => router.push('/dashboard')}
			>
				Start
			</button>
		</main>
	)
}
