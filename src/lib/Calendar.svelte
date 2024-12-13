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
.cal-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    margin-bottom: 5px;
}
.cal-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}
.empty-day {
    background: none;
    border: none;
}
.weekday {
    background-color: #f0f0f0;
    padding: 5px 0;
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

<script lang="ts">
let { year, updateRemainingVacationDays } = $props()
let selectedOptions = $state([])

const isLeapYear = (year: number) => {
    if (year % 4 !== 0) return false
    if (year % 100 !== 0) return true
    return year % 400 === 0
}

const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const months = [
    { name: 'January', days: 31, start: 1 },
    { name: 'February', days: isLeapYear(year) ? 29 : 28, start: 4 },
    { name: 'March', days: 31, start: 4 },
    { name: 'April', days: 30, start: 7 },
    { name: 'May', days: 31, start: 2 },
    { name: 'June', days: 30, start: 5 },
    { name: 'July', days: 31, start: 7 },
    { name: 'August', days: 31, start: 3 },
    { name: 'September', days: 30, start: 6 },
    { name: 'October', days: 31, start: 1 },
    { name: 'November', days: 30, start: 4 },
    { name: 'December', days: 31, start: 6 },
]

const getDay = (month: string, day: number): string | undefined => {
    const date = new Date(`${month} ${day}, ${year} 12:00:00`)
    const dayNumber = date.getDay()
    if (isNaN(dayNumber)) return
    const dayMap = {
        0: 'So',
        1: 'Mo',
        2: 'Di',
        3: 'Mi',
        4: 'Do',
        5: 'Fr',
        6: 'Sa',
    }
    return dayMap[dayNumber as keyof typeof dayMap]
}
$effect(() => updateRemainingVacationDays(selectedOptions.length))
</script>

<h1>2024</h1>
<div class="cal">
    {#each months as month}
        <div class="cal-month">
            <h2>{month.name}</h2>
            <!-- Weekday Headers -->
            <div class="cal-weekdays">
                {#each weekdays as weekday}
                    <div class="weekday">{weekday}</div>
                {/each}
            </div>
            <div class="cal-days">
                <!-- Placeholder for empty days -->
                {#each Array.from({ length: month.start - 1 }) as _}
                    <div class="empty-day"></div>
                {/each}
                <!-- Actual days of the month -->
                {#each Array.from({ length: month.days }, (_, i) => i + 1) as day}
                    <div class="toggle-wrapper">
                        <input
                            class="toggle"
                            type="checkbox"
                            id="{month.name}-{day}-toggle"
                            bind:group={selectedOptions}
                            value="{month.name}-{day}" />
                        <label
                            for="{month.name}-{day}-toggle"
                            class="toggle-label">{day}</label>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
