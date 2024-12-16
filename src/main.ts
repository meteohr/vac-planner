import { mount } from 'svelte'
import VacPlanner from './lib/VacPlanner.svelte'

const app = mount(VacPlanner, {
  target: document.getElementById('app')!,
})

export default app
