<svelte:options immutable={true} />

<script lang="ts">
  export let val
</script>

<button on:click>{val.cnt}</button>