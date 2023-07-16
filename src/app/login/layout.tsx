export default function LoginLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className='h-full bg-gray-50'>
			<body className={`h-full`}>{children}</body>
		</html>
	)
}
