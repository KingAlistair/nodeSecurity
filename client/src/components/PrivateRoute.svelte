<script>
  import { Route, navigate } from "svelte-navigator";

  export let path;
  export let component;

  async function authenticateUser() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:8080/user", {
      headers: { Authorization: accessToken },
    });
    const user = await response.json();
    if (user) {
      return true;
    } else {
      alert("Unauthorized access, redirecting to login page...");
      navigate('/login');
      return false;
    }
  }
</script>

{#await authenticateUser() then authenticated}
  {#if authenticated}
    <Route {path} {component} />
  {/if}
{/await}