<script>
    let { remainingVacationDays } = $props();
</script>

<div>
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
</style>