<script>

  import { login } from "../store.js";

  let username = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit() {
    // Check if the username and password fields are not empty
    if (username.trim() === "" || password.trim() === "") {
      errorMessage = "Please enter a username and password.";
      return;
    }

    // Attempt to login using the API
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      // If the API call fails, display an error message
      errorMessage = "Invalid username or password.";
      return;
    }

    // If the API call succeeds, extract the token from the response
    const { accessToken, refreshToken } = await response.json();

    // Update the store with the user information
    login(accessToken, refreshToken);

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
<a href="/register">Not an user? Register!</a>


<style>
  @import url('../style/login.css');
</style>