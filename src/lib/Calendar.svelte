<script lang="ts">
	import {getDay, getMonths, isHoliday, getHolidaysByStateAndYear} from "./dates.js";

	let { selectedYear, selectedState, updateRemainingVacationDays } = $props();
	let selectedOptions = $state([]);
	let holidaysPromise = $state(getHolidaysByStateAndYear(selectedState, selectedYear));
    const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
	$effect(() => {
		updateRemainingVacationDays(selectedOptions.length);
		holidaysPromise = getHolidaysByStateAndYear(selectedState, selectedYear);
	});
</script>

<h1>{selectedYear}</h1>
{#await holidaysPromise}
	<p>...waiting</p>
{:then holidays}
	<div class="cal">
		{#each getMonths(selectedYear) as month, monthIndex}
			<div class="cal-month">
				<h2>{month.name}</h2>
                <div class="cal-weekdays">
                    {#each weekdays as weekday}
                        <div class="weekday">{weekday}</div>
                    {/each}
                </div>
				<div class="cal-days">
					{#each Array.from({length: month.days}, (_, i) => i + 1) as day}
						<div class="toggle-wrapper">
							<input class="toggle" type="checkbox" id="{month.name}-{day}-toggle" bind:group={selectedOptions} value="{month.name}-{day}" disabled={isHoliday(selectedYear, monthIndex+1, day, holidays)} >
							<label for="{month.name}-{day}-toggle" class="toggle-label">{getDay(selectedYear, month.name, day)}</label>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


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
            cursor: pointer;
	}
	.toggle:checked {
			background-color: lightgreen;
	}
    .toggle:disabled {
        background-color: red;
    }
	.toggle-label {
			position: absolute;
			left: 8px;
			top: 3px;
        cursor: pointer;
        user-select: none;
	}
	.toggle-wrapper {
			position: relative;
	}
</style>