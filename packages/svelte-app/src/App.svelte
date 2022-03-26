<script lang="ts">
  import {onMount} from "svelte";
  import { store } from "./store/page-status";
  import { Route, Router } from 'svelte-routing'
  import LoginPage from './views/login/index.svelte'
  import HomePage from './views/home/index.svelte'
  import { triggerLogin } from './utils/auth'

  export let url = "";

  onMount(() => {
    triggerLogin()
  })
</script>

{#if $store.checkingUserAuth}
  Loading
{:else }
  <Router url="{url}">
    <Route path="/" component="{HomePage}" />
    <Route path="/login" component="{LoginPage}" />
  </Router>
{/if}
