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
.red {
  color: red;
}
.status-bar {
  font-size: 1.4rem;
  padding: 1.5rem 0;
}
</style>
