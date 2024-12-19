<script lang="ts">
import Calendar from './Calendar.svelte'
import StatusBar from './StatusBar.svelte'
import { states } from './lib/states'

let selectedYear = $state('2024')
let selectedState = $state(states[1].id) // bavaria default ;^)
let vacationDays = $state(30)
let remainingVacationDays = $state(30)

function updateRemainingVacationDays(plannedVacationDays: number) {
  remainingVacationDays = vacationDays - plannedVacationDays
}
</script>

<div class="wrapper">
  <h1>Vac Planner - einfach Urlaub planen</h1>
  <div class="select-sentence">
    Im Jahr
    <select bind:value={selectedYear} name="year" id="year">
      <option value="2024">2024</option>
      <option value="2025">2025</option>
    </select>
    hab ich noch
    <input
      bind:value={vacationDays}
      type="number"
      id="vacation-days"
      name="vacation-days"
      min="0"
      max="100" />
    Urlaubstage und lebe in
    <select bind:value={selectedState} name="state" id="state">
      {#each states as state}
        <option value={state.id}>{state.name}</option>
      {/each}
    </select>
  </div>

  <Calendar
    selectedYear={selectedYear}
    selectedState={selectedState}
    updateRemainingVacationDays={updateRemainingVacationDays} />
  <StatusBar remainingVacationDays={remainingVacationDays} />
</div>

<style>
h1 {
  font-size: 3rem;
}

.select-sentence {
  font-size: 1.4rem;
  padding: 1.5rem 0;
}

.wrapper {
  margin: auto;
  width: 1600px;
}
</style>
