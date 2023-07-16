import MainLayout from './MainLayout'

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return <MainLayout>{children}</MainLayout>
}
