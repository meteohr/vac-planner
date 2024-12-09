<script lang="ts">
	let { year, vacationDays } = $props();

	const isLeapYear = (year: number) => {
		if (year % 4 !== 0) return false;
		if (year % 100 !== 0) return true;
		return year % 400 === 0;
	};
	const months = [
		{ name: "January", days: 31, start: 3 },
		{ name: "February", days: isLeapYear(year) ? 29 : 28, start: 6 },
		{ name: "March", days: 31, start: 6 },
		{ name: "April", days: 30, start: 2 },
		{ name: "May", days: 31, start: 4 },
		{ name: "June", days: 30, start: 0 },
		{ name: "July", days: 31, start: 2 },
		{ name: "August", days: 31, start: 5 },
		{ name: "September", days: 30, start: 1 },
		{ name: "October", days: 31, start: 3 },
		{ name: "November", days: 30, start: 6 },
		{ name: "December", days: 31, start: 1 }
	];
	const getDay = (month: string, day: number): string | undefined => {
		const date = new Date(`${month} ${day}, ${year} 12:00:00`);
		const dayNumber = date.getDay();
		if (isNaN(dayNumber)) return;
		const dayMap = {
			0: "So",
			1: "Mo",
			2: "Di",
			3: "Mi",
			4: "Do",
			5: "Fr",
			6: "Sa"
		};
		return dayMap[dayNumber as keyof typeof dayMap];
	};
</script>

<h1>2024</h1>
<div class="cal">
	{#each months as month}
		<div class="cal-month">
			<h2>{month.name}</h2>
			<div class="cal-days">
				{#each Array.from({length: month.days}, (_, i) => i + 1) as day}
					<div class="toggle-wrapper">
						<input class="toggle" type="checkbox" id="{month.name}-{day}-toggle" onclick={() => vacationDays--}>
						<label for="{month.name}-{day}-toggle" class="toggle-label">{getDay(month.name, day)}</label>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.cal {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
	.cal-month {
		border: 1px solid black;
		margin: 10px;
		padding: 10px;
	}
	.cal-days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}
	.toggle {
			appearance: none;
			width: 35px;
			height: 30px;
			background-color: darkgrey;
	}
	.toggle:checked {
			background-color: lightgreen;
	}
	.toggle-label {
			position: absolute;
			left: 8px;
			top: 3px;
	}
	.toggle-wrapper {
			position: relative;
	}
</style>