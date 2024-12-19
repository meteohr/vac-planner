<script lang="ts">
import { getYear, getHolidaysAndSchoolVacation } from './lib/dates.js'
import Month from './Month.svelte'

let { selectedYear, selectedState, updateRemainingVacationDays } = $props()

let holidaysAndSchoolVacationPromise = $state(
  getHolidaysAndSchoolVacation(selectedState, selectedYear)
)

$effect(() => {
  holidaysAndSchoolVacationPromise = getHolidaysAndSchoolVacation(
    selectedState,
    selectedYear
  )
})
</script>

{#await holidaysAndSchoolVacationPromise}
  <p>...waiting</p>
{:then holidaysAndSchoolVacation}
  <div class="cal">
    {#each getYear(selectedYear, holidaysAndSchoolVacation) as monthInfo}
      <Month
        month={monthInfo}
        updateRemainingVacationDays={updateRemainingVacationDays} />
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
.cal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
