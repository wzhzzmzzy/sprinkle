<script lang="ts">
  import { Route, Router } from 'svelte-navigator'
  import HomePage from './views/home/index.svelte'

  export const url = "";
</script>
<Router url="{url}">
  <Route path="/" component="{HomePage}" />
</Router>
