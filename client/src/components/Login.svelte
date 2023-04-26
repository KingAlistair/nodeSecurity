<script>
  import { navigate } from "svelte-navigator";
  import { login } from "../store.js";

  let username = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit() {
    // check if the username and password fields are not empty
    if (username.trim() === "" || password.trim() === "") {
      errorMessage = "Please enter a username and password.";
      return;
    }

    // attempt to log in using the API
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      // if the API call fails, display an error message
      errorMessage = "Invalid username or password.";
      return;
    }

    // if the API call succeeds, extract the token from the response
    const { accessToken, refreshToken } = await response.json();

    // update the store with the user information
    login(accessToken, refreshToken);

    // navigate to the main page
    location.href = '/';
  }
</script>

<div class="login">
  <form on:submit|preventDefault={handleSubmit}>
    <h1>Login</h1>
    <label>
      Username:
      <input type="text" bind:value={username} />
    </label>

    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>

    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}

    <button type="submit">Login</button>
  </form>
</div>


<style>
  @import url('../style/login.css');
</style>