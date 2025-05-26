export const localStorageKey = 'vacationDays'

type VacationDaysStorage = {
  [year: string]: string[]
}

export const storeVacationDay = (vacationDay: string, year: string) => {
  const storage: VacationDaysStorage = JSON.parse(
    localStorage.getItem(localStorageKey)!
  )
  if (storage?.[year]) {
    if (storage[year].includes(vacationDay)) {
      storage[year].splice(storage[year].indexOf(vacationDay), 1)
    } else {
      storage[year].push(vacationDay)
    }
    localStorage.setItem(
      'vacationDays',
      JSON.stringify({ ...storage, [year]: storage[year] })
    )
  } else {
    localStorage.setItem(
      'vacationDays',
      JSON.stringify({ ...storage, [year]: [vacationDay] })
    )
  }
}

export const getVacationDaysForYear = (year: string) => {
  const storage: VacationDaysStorage = JSON.parse(
    localStorage.getItem(localStorageKey)!
  )
  return storage?.[year].length || 0
}

export const getVacationDaysForMonth = (year: string, month: string) => {
  const storage: VacationDaysStorage = JSON.parse(
    localStorage.getItem(localStorageKey)!
  )
  if (storage?.[year]) {
    return storage[year].filter((vacationDay: string) =>
      vacationDay.startsWith(`${month}`)
    )
  }
  return []
}
