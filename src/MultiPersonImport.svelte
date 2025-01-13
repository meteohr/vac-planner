<script lang="ts">
import { selectedDaysStore } from './stores/selectedDays'
import { get } from 'svelte/store'

interface Person {
  name: string
  fileInputId: string
}

let people: Person[] = [{ name: 'Person A', fileInputId: `person-0` }]
let id = 1

function addPerson() {
  people = [...people, { name: '', fileInputId: `person-${id++}` }]
}

function triggerFileInput(index: number) {
  const fileInput = document.getElementById(
    people[index].fileInputId
  ) as HTMLInputElement
  fileInput?.click()
}

function handleFileSelect(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target?.result as string) as {
        month: string
        day: number
      }[]
      const currentStore = get(selectedDaysStore)

      for (const { month, day } of importedData) {
        if (!currentStore[month]) {
          currentStore[month] = []
        }
        const dayStr = `${month}-${day}`
        // Only push if it’s not already in the array
        if (!currentStore[month].includes(dayStr)) {
          currentStore[month].push(dayStr)
        }
      }

      selectedDaysStore.set(currentStore)
    } catch (error) {
      console.error('Error reading JSON file:', error)
    }
  }
  reader.readAsText(file)
}
</script>

<div>
  <h2>Import vacation days from other people</h2>

  {#each people as person, i}
    <div style="margin-bottom: 1rem;">
      <!-- Input field for the person's name -->
      <input
        type="text"
        bind:value={person.name}
        placeholder="Person's name"
        style="margin-right: 0.5rem;" />

      <!-- Button to trigger JSON import -->
      <button on:click={() => triggerFileInput(i)}> Import JSON </button>

      <!-- Hidden file input linked to the Import JSON button -->
      <input
        id={person.fileInputId}
        type="file"
        accept=".json"
        style="display: none;"
        on:change={(e) => handleFileSelect(i, e)} />
    </div>
  {/each}

  <!-- Add another person button -->
  <button on:click={addPerson}>Add another person</button>
</div>

<style>
h2 {
  margin-bottom: 1rem;
}

input[type='text'] {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
