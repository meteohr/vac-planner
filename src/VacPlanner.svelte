<script lang="ts">
import Calendar from './Calendar.svelte'
import StatusBar from './StatusBar.svelte'
import { states } from './lib/states'

let selectedYear = $state('2025')
let selectedState = $state(states[1].id) // bavaria default ;^) <- ofc
let vacationDays = $state(30)
let remainingVacationDays = $state(30)

function updateRemainingVacationDays(plannedVacationDays: number) {
  remainingVacationDays = vacationDays - plannedVacationDays
}
</script>

<div class="wrapper">
  <h1 class="heading">
    <span class="full-title">Vac Planner - einfach Urlaub planen</span>
    <span class="short-title">Vac Planner</span>
  </h1>
  <div class="select-sentence">
    Im Jahr
    <select bind:value={selectedYear} name="year" id="year">
      <option value="2024">2024</option>
      <option value="2025">2025</option>
    </select>
    habe ich noch
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
  font-family: 'Chewy', serif;
  font-weight: 400;
  font-size: clamp(2rem, 5vw, 4rem);
  color: hsl(234, 35%, 38%);
}

.select-sentence {
  font-size: clamp(1rem, 2vw, 1.4rem);
  padding: 1.5rem 0;
}

.wrapper {
  margin: 0 auto;
  padding: 1rem;
  max-width: 1200px;
  box-sizing: border-box;
}

.full-title {
  display: inline;
}
.short-title {
  display: none;
}

@media (max-width: 600px) {
  .full-title {
    display: none;
  }
  .short-title {
    display: inline;
  }
}
</style>
