'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SnackbarType {
	message: string
	type: 'error' | 'success'
}

interface SnackbarContextType {
	snackbar: SnackbarType | null
	showSnackbar: (type: 'success' | 'error', message: string) => void
	hideSnackbar: () => void
}

const defaultSnackbarContext: SnackbarContextType = {
	snackbar: null,
	showSnackbar: () => {},
	hideSnackbar: () => {},
}

const SnackbarContext = createContext<SnackbarContextType>(
	defaultSnackbarContext
)

export const useSnackbar = () => {
	return useContext(SnackbarContext)
}

interface SnackbarProviderProps {
	children: ReactNode
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
	children,
}) => {
	const [snackbar, setSnackbar] = useState<SnackbarType | null>(null)

	const hideSnackbar = () => {
		setSnackbar(null)
	}

	const showSnackbar = (type: 'error' | 'success', message: string) => {
		setSnackbar({ message, type })
		setTimeout(hideSnackbar, 3000)
	}

	return (
		<SnackbarContext.Provider value={{ snackbar, showSnackbar, hideSnackbar }}>
			{children}
		</SnackbarContext.Provider>
	)
}
