<script>
  import { user } from "../store.js";
  import { navigate } from "svelte-navigator";
  import Toast, { Toaster, toast } from "svelte-french-toast";

  let loggedIn = false;
  let username = "Guest";

  authenticateUser();

  async function authenticateUser() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:8080/user", {
      headers: { Authorization: accessToken },
    });
    const user = await response.json();
    if (user) {
      loggedIn = true;
      username = user.username;
      toast.success(`Welcome ${username}!`);
    }
  }
</script>

<div class="container">
  <h1>Welcome {username}!</h1>
  {#if loggedIn}
    <p>Check out the Waiting room or feel free to contact us!</p>
  {:else}
    <p>
      Our main page welcomes everyone, but to access the waiting room or contact
      us, you need to login!
    </p>
  {/if}
</div>
<Toaster />

<style>
  @import url("../style/global.css");
</style>
