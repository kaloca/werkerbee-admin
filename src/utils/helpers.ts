function validateEmail(email: string): boolean {
	// Email regex pattern
	const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
	return pattern.test(email)
}

function validatePhoneNumber(phoneNumber: string): boolean {
	// Phone number regex pattern
	const pattern = /^\(\d{3}\) \d{3}-\d{4}$/
	return pattern.test(phoneNumber)
}

function validateUsername(username: string): boolean {
	if (username.length > 20 || username.length < 5) {
		return false
	}
	const regex = /^[a-z0-9_.]+$/
	return regex.test(username)
}

function autoFormatPhoneNumber(input: string): string {
	let phoneNumber = input.replace(/\D/g, '') // Remove non-digits
	const maxLength = 10

	// Truncate to the maximum length if necessary
	if (phoneNumber.length > maxLength) {
		phoneNumber = phoneNumber.slice(0, maxLength)
	}

	// Apply formatting
	if (phoneNumber.length > 6) {
		phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3')
	} else if (phoneNumber.length > 3) {
		phoneNumber = phoneNumber.replace(/(\d{3})(\d+)/, '($1) $2')
	} else {
		phoneNumber = phoneNumber.replace(/(\d+)/, '($1')
	}

	return phoneNumber
}

function formatArrayToString(baseArray: string[], maxLength: number): string {
	const array = baseArray.filter((word) => word !== '')

	// Capitalize the first letter of each word and join them into a single string
	const stringWithCapitalizedWords = array
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(', ')

	// Check if the length of the string is greater than the maximum length, and truncate if necessary
	const finalString =
		stringWithCapitalizedWords.length > maxLength
			? stringWithCapitalizedWords.slice(0, maxLength - 3) + '...'
			: stringWithCapitalizedWords

	return finalString
}

const formatAMPM = (date: Date): string => {
	let hours = date.getHours()
	let minutes: string | number = date.getMinutes()
	let ampm = hours >= 12 ? 'PM' : 'AM'
	hours = hours % 12
	hours = hours ? hours : 12 // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes
	var strTime = hours + ':' + minutes + ' ' + ampm
	return strTime
}

const classNames = (...classes: any) => {
	return classes.filter(Boolean).join(' ')
}

const formatTime = (dateTimeString: string) => {
	const date = new Date(dateTimeString)
	let hours = date.getUTCHours()
	let minutes = date.getUTCMinutes()

	let hoursString = hours < 10 ? '0' + hours : '' + hours
	let minutesString = minutes < 10 ? '0' + minutes : '' + minutes

	return `${hoursString}:${minutesString}`
}

const formatDate = (dateTimeString: string) => {
	const date = new Date(dateTimeString)
	let year = date.getUTCFullYear()
	let month = date.getUTCMonth() + 1 // JavaScript months are 0-11
	let day = date.getUTCDate()

	let yearString = '' + year
	let monthString = month < 10 ? '0' + month : '' + month
	let dayString = day < 10 ? '0' + day : '' + day

	return `${yearString}-${monthString}-${dayString}`
}

function formatDateRange(start: Date, end: Date) {
	// Array of month names for formatting
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	let startMonth = monthNames[start.getMonth()]
	let startYear = start.getFullYear()

	let endMonth = monthNames[end.getMonth()]
	let endYear = end.getFullYear()

	// If the start and end year are the same, don't repeat the year
	if (startYear === endYear) {
		return `${startMonth} - ${endMonth} ${endYear}`
	} else {
		return `${startMonth} ${startYear} - ${endMonth} ${endYear}`
	}
}

const helpers = {
	validateEmail,
	validatePhoneNumber,
	autoFormatPhoneNumber,
	formatArrayToString,
	validateUsername,
	formatAMPM,
	classNames,
	formatTime,
	formatDate,
	formatDateRange,
}

export default helpers
