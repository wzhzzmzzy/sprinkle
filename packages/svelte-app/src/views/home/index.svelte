<svelte:head>
  <title>Hello</title>
</svelte:head>

<script lang="ts">
  import produce from "immer"
  import Counter from './counter.svelte'
  let val = [
    { cnt: 0 },
    { cnt: 0 },
    { cnt: 0 }
  ]
  const increment = (n) => {
    val = val.map((v, i) => {
      if (n === i) return produce(v, draft => {
        draft.cnt += 1
      })
      return v
    })
  }
</script>

<div>
  {#each val as v, i}
    <Counter val={v} on:click={() => increment(i)} />
  {/each}
</div>