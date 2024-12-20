<script>
let { remainingVacationDays } = $props()
</script>

<div class="status-bar">
  Verbleibende Urlaubstage:
  {#if remainingVacationDays < 0}
    <span class="red">{remainingVacationDays}</span>
  {:else}
    {remainingVacationDays}
  {/if}
</div>

<style>
.status-bar {
  font-size: 1.4rem;
  padding: 1.5rem;
  color: var(--text-color);
}

/* Use var(--error-color) instead of hard-coded red */
.red {
  color: var(--error-color);
}
</style>
