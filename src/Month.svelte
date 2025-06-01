<script lang="ts">
import type { MonthInfo } from './lib/dates'
import type { MouseEventHandler } from 'svelte/elements'
import { getVacationDaysForMonth, storeVacationDay } from './lib/localStorage'

let {
  month,
  updateRemainingVacationDays,
  year,
  state,
}: {
  year: string
  month: MonthInfo
  state: string
  updateRemainingVacationDays: (selectedOptionsLength: number) => void
} = $props()

const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const firstWeekDayOfMonth = month.days[0].date.getDay()
const positionOfFirstDay =
  firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1

const storedVacationDaysInMonth = getVacationDaysForMonth(
  year,
  month.name,
  state
)

const handleClick: MouseEventHandler<HTMLInputElement> = (event) => {
  if (event.currentTarget.checked) {
    storeVacationDay(event.currentTarget.value, year, state)
  }
  updateRemainingVacationDays(event.currentTarget.checked ? -1 : 1)
}

const isDayStored = (day: string) => {
  return storedVacationDaysInMonth.includes(day)
}
</script>

<div class="cal-month">
  <h2>{month.label}</h2>
  <div class="cal-weekdays-header">
    {#each weekdays as weekday}
      <div class="weekday">{weekday}</div>
    {/each}
  </div>
  <div class="cal-days">
    {#each Array.from({ length: positionOfFirstDay }) as _}
      <div class="empty-day"></div>
    {/each}
    {#each month.days as day, dayIndex}
      <div class="toggle-wrapper">
        <input
          class="toggle{day.isSchoolVacation ? ' vacation' : null}{day.isHoliday
            ? ' holiday'
            : null}{day.isWeekend ? ' weekend' : null}"
          type="checkbox"
          id={day.id}
          onclick={handleClick}
          value="{month.name}-{dayIndex + 1}"
          disabled={day.isHoliday || day.isWeekend}
          checked={isDayStored(`${month.name}-${dayIndex + 1}`)} />
        <label
          for={day.id}
          class="toggle-label{day.isWeekend ? ' weekend' : null}"
          >{dayIndex + 1}</label>
      </div>
    {/each}
  </div>
</div>

<style>
.cal-month {
  background-color: hsl(234, 35%, 85%);
  border-radius: 10px;
  padding: 10px;
  border: 1px solid hsl(234, 35%, 38%);
}
h2 {
  color: hsl(234, 35%, 38%);
}
.cal-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 5px;
}
.cal-weekdays-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
}
.weekday {
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 5px 0;
}
.empty-day {
  background: none;
  border: none;
}
.toggle-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  overflow: hidden;
}
.toggle {
  appearance: none;
  width: 35px;
  height: 30px;
  border: 1px solid hsl(234, 35%, 38%);
  cursor: pointer;
}
.toggle.vacation {
  border-top: 3px solid rgb(255, 131, 131);
}
.toggle.holiday {
  background-color: rgb(255, 131, 131);
  cursor: default;
}
.toggle.weekend {
  background-color: #f0f0f0;
  cursor: default;
}
.toggle:checked {
  background-color: rgb(140, 205, 234);
}
.toggle-label {
  position: absolute;
  cursor: pointer;
  pointer-events: none;
  user-select: none;
  color: hsl(234, 35%, 38%);
}
.toggle-label.weekend {
  color: grey;
}
</style>
