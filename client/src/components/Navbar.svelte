<script>
  import { logout } from "../store.js";
  import { authenticateUser } from "../utils/authenticator.js";

  let loggedIn = false;
  let username = "Guest";

  // Calls authenticateUser function that updates loggedIn and username
  (async function () {
    const { loggedIn: isLoggedIn, username: loggedInUsername } =
      await authenticateUser();
    loggedIn = isLoggedIn;
    username = loggedInUsername;
  })();
</script>

<nav class="navbar">
  <ul>
    <li>
      <a href="/">Main Page</a>
    </li>
    {#if loggedIn}
      <li>
        <a href="/waitingRoom">Waiting Room</a>
      </li>
      <li>
        <a href="/contact">Contact us!</a>
      </li>
    {/if}
    <li class="right">
      {#if loggedIn}
        <button on:click={logout}>Logout</button>
      {:else}
        <a href="/login">Login</a>
      {/if}
    </li>
  </ul>
</nav>

<style>
 @import url("../style/navbar.css");
</style>
