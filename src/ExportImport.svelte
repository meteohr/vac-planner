<script lang="ts">
import { selectedDaysStore } from './stores/selectedDays'
import { get } from 'svelte/store'

// Reactive statement to keep storeValue updated
$: storeValue = get(selectedDaysStore)

function exportToJSON() {
  if (!storeValue || Object.keys(storeValue).length === 0) {
    console.warn('No selected days to export.')
    return
  }

  const allSelectedDays = Object.entries(storeValue).flatMap(
    ([monthName, days]) =>
      days.map((dayStr) => {
        const [month, day] = dayStr.split('-')
        return { month, day: parseInt(day, 10) }
      })
  )

  const jsonData = JSON.stringify(allSelectedDays, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'selected-days.json'
  a.click()
  URL.revokeObjectURL(url)
}

function triggerFileInput() {
  document.getElementById('importFileInput')?.click()
}

function handleFileSelect(event: Event) {
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

<div class="export-import-controls">
  <button on:click={exportToJSON}>Export to JSON</button>
  <button on:click={triggerFileInput}>Import from JSON</button>
  <input
    id="importFileInput"
    type="file"
    accept=".json"
    style="display: none;"
    on:change={handleFileSelect} />
</div>

<style>
.export-import-controls {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
</style>
