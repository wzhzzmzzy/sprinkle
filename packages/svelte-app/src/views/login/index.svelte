<script lang="ts">
  import { USER_ROLE } from '../../types/user';
  import { store } from "../../store/page-status";
  import { triggerLogin } from "../../utils/auth";
</script>

{#if $store.UserRole === USER_ROLE.Anonymous}
  <button on:click={triggerLogin}>Login</button>
{/if}
