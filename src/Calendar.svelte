<script lang="ts">
import { getYear, getHolidaysAndSchoolVacation } from './lib/dates.js'
import Month from './Month.svelte'

// Define props as exported variables
export let selectedYear: number
export let selectedState: string
export let updateRemainingVacationDays: (selectedOptionsLength: number) => void

// Initialize the data-fetching promise
let holidaysAndSchoolVacationPromise = getHolidaysAndSchoolVacation(
  selectedState,
  selectedYear
)
</script>

{#await getHolidaysAndSchoolVacation(selectedState, selectedYear)}
  <p>Kalender lädt...</p>
{:then holidaysAndSchoolVacation}
  <div class="cal">
    {#each getYear(selectedYear, holidaysAndSchoolVacation) as monthInfo}
      <Month
        month={monthInfo}
        updateRemainingVacationDays={updateRemainingVacationDays} />
    {/each}
  </div>
{/await}

<!--<p style="color: red">{message}</p>-->

<style>
.cal {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 15px;
}

@media (min-width: 600px) {
  .cal {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cal {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .cal {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
