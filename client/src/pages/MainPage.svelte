<script>
 import { Toaster, toast } from "svelte-french-toast";
 import { authenticateUser } from "../utils/authenticator.js";

let loggedIn = false;
let username = "Guest";



(async function () {
  const { loggedIn: isLoggedIn, username: loggedInUsername } =
    await authenticateUser();
  loggedIn = isLoggedIn;
  username = loggedInUsername;
  toast.success(`Welsome ${username}`);
})();
</script>

<div class="container">
  <h1>Welcome {username}!</h1>
  {#if loggedIn}
    <p class="text">Check out the Waiting room or feel free to contact us!</p>
  {:else}
    <p class="text">
      Our main page welcomes everyone, but to access the waiting room or contact
      us, you need to login!
    </p>
  {/if}
</div>
<Toaster />

<style>
  @import url("../style/global.css");
</style>
