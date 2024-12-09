<script>
	import Calendar from "./Calendar.svelte";

	let selectedYear = $state();
	let vacationDays = $state(30);
</script>

<style>
	.wrapper {
		padding: 20px;
	}
</style>

<div class="wrapper">
	<h1>Vac Planner - einfach Urlaub planen</h1>
	Jahr:
	<select bind:value={selectedYear} name="year" id="year">
		<option value="2024">2024</option>
		<option value="2025">2025</option>
	</select>
	Urlaubstage: <input bind:value={vacationDays} type="number" id="vacation-days" name="vacation-days" min="0" max="100" />
	Schulferien:
	<select name="state" id="state">
		<option value="bavaria">Bayern</option>
		<option value="rlp">Rheinland-Pfalz</option>
		<option value="berlin">Berlin</option>
	</select>
	<Calendar year={selectedYear} vacationDays={vacationDays} />
</div>
