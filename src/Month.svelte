<script lang="ts">
import type { MonthInfo } from './lib/dates'

let {
  month,
  updateRemainingVacationDays,
}: {
  month: MonthInfo
  updateRemainingVacationDays: (selectedOptionsLength: number) => void
} = $props()

let selectedOptions = $state([])

const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const firstDay = month.days[0].date.getDay()
const positionOfFirstDay = firstDay === 0 ? 6 : firstDay - 1

$effect(() => {
  updateRemainingVacationDays(selectedOptions.length)
})
</script>

<div class="cal-month">
  <h2>{month.label}</h2>
  <div class="cal-weekdays">
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
          bind:group={selectedOptions}
          value="{month.name}-{dayIndex + 1}"
          disabled={day.isHoliday || day.isWeekend} />
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
.cal-weekdays {
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
  /*background-color: hsl(234, 35%, 43%);*/
  border: 1px solid hsl(234, 35%, 38%);
  cursor: pointer;
}
.toggle.vacation {
  border-top: 3px solid rgb(255, 131, 131);
}
.toggle.holiday {
  background-color: rgb(255, 131, 131);
}
.toggle.weekend {
  background-color: #f0f0f0;
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
