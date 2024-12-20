<script lang="ts">
import Calendar from './Calendar.svelte'
import StatusBar from './StatusBar.svelte'
import { states } from './lib/states'

let selectedYear = $state('2025')
let selectedState = $state(states[1].id) // bavaria default ;^) <- ofc
let vacationDays = $state(30)
let remainingVacationDays = $state(30)
let darkMode = $state(false)

function updateRemainingVacationDays(plannedVacationDays: number) {
  remainingVacationDays = vacationDays - plannedVacationDays
}

function toggleDarkMode() {
  darkMode = !darkMode
}
</script>

<div class="wrapper{darkMode ? ' dark' : ''}">
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
  <button on:click={toggleDarkMode}>
    {darkMode ? 'Light' : 'Dark'}
  </button>

  <Calendar
    selectedYear={selectedYear}
    selectedState={selectedState}
    updateRemainingVacationDays={updateRemainingVacationDays} />
  <StatusBar remainingVacationDays={remainingVacationDays} />
</div>

<style>
:root {
  --bg-color: #fff;
  --text-color: #333;
  --accent-color: hsl(234, 35%, 38%);
  --error-color: red;
}

/* Dark mode overrides */
body {
  margin: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: sans-serif;
}

.heading {
  font-family: 'Chewy', serif;
  font-weight: 400;
  font-style: normal;
  font-size: clamp(2rem, 5vw, 4rem);
  color: var(--accent-color);
  margin: 1rem;
}

button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--accent-color);
  border: none;
  color: var(--bg-color);
  cursor: pointer;
}

input[type='number'],
select {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
}

/*h1 {*/
/*  font-family: 'Chewy', serif;*/
/*  font-weight: 400;*/
/*  font-size: clamp(2rem, 5vw, 4rem);*/
/*  color: hsl(234, 35%, 38%);*/
/*}*/

.select-sentence {
  font-size: clamp(1rem, 2vw, 1.4rem);
  padding: 1.5rem 0;
}

.wrapper {
  background-color: var(--bg-color);
  margin: 0 auto;
  padding: 1rem;
  max-width: 1440px;
  box-sizing: border-box;
}

.wrapper.dark {
  --bg-color: #333131;
  --text-color: #f0f0f0;
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
