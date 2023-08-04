import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Snackbar from '@/components/snackbar/Snackbar'
import { SnackbarProvider } from '@/components/snackbar/SnackbarContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'WerkerBee Admin',
	description: 'Dashboard',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className='h-full bg-gray-100'>
			<body className={`${inter.className} h-full`}>
				<SnackbarProvider>
					<Snackbar />
					{children}
				</SnackbarProvider>
			</body>
		</html>
	)
}
