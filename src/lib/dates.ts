export const getMonths = (year: number) => {
  const isLeapYear = (year: number) => {
    if (year % 4 !== 0) return false
    if (year % 100 !== 0) return true
    return year % 400 === 0
  }

  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: isLeapYear(year) ? 29 : 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ]

  return months.map((month, index) => {
    const start = new Date(year, index, 1).getDay()
    return {
      ...month,
      start,
    }
  })
}

export const getDay = (
  year: number,
  month: string | number,
  day: number
): string | undefined => {
  const date = new Date(`${month} ${day}, ${year} 12:00:00`)
  const dayNumber = date.getDay()
  if (isNaN(dayNumber)) return
  const dayMap = {
    0: 'So',
    1: 'Mo',
    2: 'Di',
    3: 'Mi',
    4: 'Do',
    5: 'Fr',
    6: 'Sa',
  }
  return dayMap[dayNumber as keyof typeof dayMap]
}

// https://www.api-feiertage.de/
const getHolidays = async (state: string, year: number) => {
  const responseJson = await fetch(
    `https://get.api-feiertage.de?years=${year}&states=${state}`
  )
  const response = await responseJson.json()
  if (response.state === 'error') return []
  return response.feiertage
}

export const isHoliday = (
  year: number,
  month: number,
  day: number,
  holidays: Array<{ date: string }>
): boolean => {
  const holiday = holidays.find(
    (holiday) =>
      `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}` === holiday.date
  )
  return !!holiday
}

// https://ferien-api.de/
const getSchoolVacation = async (state: string, year: number) => {
  const responseJson = await fetch(
    `https://ferien-api.de/api/v1/holidays/${state.toUpperCase()}/${year}`
  )
  const response = await responseJson.json()
  if (response.state === 'error') return []
  console.log(response)
  return response
}

export const isSchoolVacation = (
  year: number,
  month: number,
  day: number,
  schoolVacation: Array<{ start: string; end: string }>
): boolean => {
  const check = new Date(`${year}-${month}-${day}`).getTime()
  const vacation = schoolVacation.find(
    ({ start, end }) =>
      check <= new Date(end).getTime() && check >= new Date(start).getTime()
  )
  return !!vacation
}

const addLeadingZero = (input: number) => {
  return input.toString().length === 1 ? `0${input}` : input
}

export const getHolidaysAndSchoolVacation = async (
  state: string,
  year: number
) => {
  const holidays = await getHolidays(state, year)
  const schoolVacation = await getSchoolVacation(state, year)
  return {
    holidays,
    schoolVacation,
  }
}
