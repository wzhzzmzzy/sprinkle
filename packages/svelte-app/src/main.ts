import App from './App.svelte'
import type { SvelteComponent } from "svelte";

let app : SvelteComponent | null = null

if (!import.meta.env.SSR) {
  app = new App({
    target: document.getElementById('app'),
    hydrate: true
  })
}

export default app || App
