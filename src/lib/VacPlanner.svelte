<script lang="ts">
import Calendar from './Calendar.svelte'
import StatusBar from './StatusBar.svelte'

let selectedYear = $state('2024')
let selectedState = $state('by')
let vacationDays = $state(30)
let remainingVacationDays = $state(30)

function updateRemainingVacationDays(plannedVacationDays: number) {
  remainingVacationDays = vacationDays - plannedVacationDays
}
</script>

<div class="wrapper">
  <h1>Vac Planner - einfach Urlaub planen</h1>
  Jahr:
  <select bind:value={selectedYear} name="year" id="year">
    <option value="2024">2024</option>
    <option value="2025">2025</option>
  </select>
  Urlaubstage:
  <input
    bind:value={vacationDays}
    type="number"
    id="vacation-days"
    name="vacation-days"
    min="0"
    max="100" />
  Schulferien:
  <select bind:value={selectedState} name="state" id="state">
    <option value="by">Bayern</option>
    <option value="rp">Rheinland-Pfalz</option>
    <option value="ne">Berlin</option>
  </select>
  <Calendar
    selectedYear={selectedYear}
    selectedState={selectedState}
    updateRemainingVacationDays={updateRemainingVacationDays} />
  <StatusBar remainingVacationDays={remainingVacationDays} />
</div>

<style>
.wrapper {
  padding: 20px;
}
</style>
