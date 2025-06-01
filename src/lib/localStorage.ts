export const localStorageKey = 'vacationDays'

type VacationDaysStorage = {
  [year: string]: {
    // TODO: more explicit type for state?
    [state: string]: string[]
  }
}

// TODO: Make this cleaner
export const storeVacationDay = (
  vacationDay: string,
  year: string,
  state: string
) => {
  const storage: VacationDaysStorage = JSON.parse(
    localStorage.getItem(localStorageKey)!
  )
  if (storage?.[year][state]) {
    if (storage[year][state].includes(vacationDay)) {
      storage[year][state].splice(storage[year][state].indexOf(vacationDay), 1)
    } else {
      storage[year][state].push(vacationDay)
    }
    localStorage.setItem(
      'vacationDays',
      JSON.stringify({
        ...storage,
        [year]: { ...storage[year], [state]: storage[year][state] },
      })
    )
  } else {
    localStorage.setItem(
      'vacationDays',
      JSON.stringify({
        ...storage,
        [year]: { ...storage?.[year], [state]: [vacationDay] },
      })
    )
  }
}

export const getVacationDaysForYear = (year: string, state: string) => {
  const storage: VacationDaysStorage = JSON.parse(
    localStorage.getItem(localStorageKey)!
  )
  return storage?.[year]?.[state].length || 0
}

export const getVacationDaysForMonth = (
  year: string,
  month: string,
  state: string
) => {
  const storage: VacationDaysStorage = JSON.parse(
    localStorage.getItem(localStorageKey)!
  )
  if (storage?.[year][state]) {
    return storage[year][state].filter((vacationDay: string) =>
      vacationDay.startsWith(`${month}`)
    )
  }
  return []
}
