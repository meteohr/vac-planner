interface Holiday {
  date: string
}

interface SchoolVacation {
  start: string
  end: string
}

export interface HolidaysAndSchoolVacation {
  holidays: Holiday[]
  schoolVacation: SchoolVacation[]
}

export interface DayInfo {
  isHoliday: boolean
  isSchoolVacation: boolean
  isWeekend: boolean
  date: Date
  id: string
}

export interface MonthInfo {
  days: DayInfo[]
  label: string
  name: string
}

export const getYear = (
  year: number,
  holidaysAndVacation: HolidaysAndSchoolVacation
): MonthInfo[] => {
  const months = [
    { label: 'Januar', name: 'January', days: 31 },
    { label: 'Februar', name: 'February', days: isLeapYear(year) ? 29 : 28 },
    { label: 'März', name: 'March', days: 31 },
    { label: 'April', name: 'April', days: 30 },
    { label: 'Mai', name: 'May', days: 31 },
    { label: 'Juni', name: 'June', days: 30 },
    { label: 'Juli', name: 'July', days: 31 },
    { label: 'August', name: 'August', days: 31 },
    { label: 'September', name: 'September', days: 30 },
    { label: 'Oktober', name: 'October', days: 31 },
    { label: 'November', name: 'November', days: 30 },
    { label: 'Dezember', name: 'December', days: 31 },
  ]

  return months.map((month, index) => {
    return {
      days: Array.from({ length: month.days }, (_, i) => i + 1).map((day) => {
        return getDayInfo(
          new Date(`${year}-${index + 1}-${day}`),
          month.name,
          holidaysAndVacation
        )
      }),
      label: month.label,
      name: month.name,
    }
  })
}

const getDayInfo = (
  date: Date,
  monthName: string,
  holidaysAndSchoolVacation: HolidaysAndSchoolVacation
): DayInfo => {
  return {
    isHoliday: isHoliday(date, holidaysAndSchoolVacation.holidays),
    isSchoolVacation: isSchoolVacation(
      date,
      holidaysAndSchoolVacation.schoolVacation
    ),
    isWeekend: isWeekend(date),
    date,
    id: `${monthName}-${date.getDay()}-toggle`,
  }
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

export const isHoliday = (day: Date, holidays: Holiday[]): boolean => {
  const holiday = holidays.find(
    (holiday) =>
      `${day.getFullYear()}-${addLeadingZero(day.getMonth() + 1)}-${addLeadingZero(day.getDate())}` ===
      holiday.date
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
  return response
}

export const isSchoolVacation = (
  day: Date,
  schoolVacation: SchoolVacation[]
): boolean => {
  const check = day.getTime()
  const vacation = schoolVacation.find(
    ({ start, end }) =>
      check <= new Date(end).getTime() && check >= new Date(start).getTime()
  )
  return !!vacation
}

const isWeekend = (day: Date) => {
  return day.getDay() === 6 || day.getDay() === 0
}

const isLeapYear = (year: number) => {
  if (year % 4 !== 0) return false
  if (year % 100 !== 0) return true
  return year % 400 === 0
}

const addLeadingZero = (input: number) => {
  return input.toString().length === 1 ? `0${input}` : input
}

export const getHolidaysAndSchoolVacation = async (
  state: string,
  year: number
): Promise<HolidaysAndSchoolVacation> => {
  // TODO. Promise.all...
  const holidays = await getHolidays(state, year)
  const schoolVacation = await getSchoolVacation(state, year)
  return {
    holidays,
    schoolVacation,
  }
}
