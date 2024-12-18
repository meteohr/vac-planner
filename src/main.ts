import { mount } from 'svelte'
import VacPlanner from './VacPlanner.svelte'

const app = mount(VacPlanner, {
  target: document.getElementById('app')!,
})

export default app
