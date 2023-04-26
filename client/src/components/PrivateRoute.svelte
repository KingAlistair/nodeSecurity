<script>
  import { Route } from "svelte-navigator";
  import { toast } from "svelte-french-toast";

  export let path;
  export let component;

  //Checks if user is found in DB from token's user information
  async function authenticateUser() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:8080/user", {
      headers: { Authorization: accessToken },
    });
    const user = await response.json();
    if (user) {
      return true;
    }
    return false;
  }
</script>

{#await authenticateUser()}
{:then authenticated}
  {#if authenticated}
    <Route {path} {component} />
  {:else}
    {#await Promise.resolve()}
      <p>{@html toast('Unauthorized access, please login!')}</p>
    {:then}
      <p>You must be logged in to access this page.</p>
    {/await}
  {/if}
{/await}
