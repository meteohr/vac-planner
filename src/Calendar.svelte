<script lang="ts">
import { getYear, getHolidaysAndSchoolVacation } from './lib/dates.js'
import Month from './Month.svelte'

let { selectedYear, selectedState, updateRemainingVacationDays } = $props()
</script>

{#await getHolidaysAndSchoolVacation(selectedState, selectedYear)}
  <p>Kalender lädt...</p>
{:then holidaysAndSchoolVacation}
  <div class="cal">
    {#each getYear(selectedYear, holidaysAndSchoolVacation) as monthInfo}
      <Month
        month={monthInfo}
        year={selectedYear}
        state={selectedState}
        updateRemainingVacationDays={updateRemainingVacationDays} />
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
.cal {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 25px;
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
