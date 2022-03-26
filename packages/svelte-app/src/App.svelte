<script lang="ts">
  import {onMount} from "svelte";
  import { Route, Router } from 'svelte-navigator'
  import LoginPage from './views/login/index.svelte'
  import HomePage from './views/home/index.svelte'
  import { triggerLogin } from './utils/auth'

  export let url = "";

  onMount(() => {
    triggerLogin()
  })
</script>

<Router url="{url}">
  <Route path="/" component="{HomePage}" />
  <Route path="/login" component="{LoginPage}" />
</Router>

