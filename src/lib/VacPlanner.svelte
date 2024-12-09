<script>
	import Calendar from "./Calendar.svelte";
</script>

<style>
	.wrapper {
		padding: 20px;
	}
</style>

<div class="wrapper">
	<h1>Vac Planner - einfach Urlaub planen</h1>
	Jahr:
	<select name="year" id="year">
		<option value="2024">2024</option>
		<option value="2025">2025</option>
	</select>
	Urlaubstage: <input type="number" id="vacation-days" name="vacation-days" value="30" min="0" max="100" />
	Schulferien:
	<select name="state" id="state">
		<option value="bavaria">Bayern</option>
		<option value="rlp">Rheinland-Pfalz</option>
		<option value="berlin">Berlin</option>
	</select>
	<Calendar />
</div>
