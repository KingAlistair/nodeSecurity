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

<div class="container">
  <form on:submit|preventDefault={handleSubmit}>
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
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #252525;
    color: #fff;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
    background-color: #404040;
    color: #fff;
  }

  input[type="text"]::placeholder,
  input[type="password"]::placeholder {
    color: #ccc;
  }

  button[type="submit"] {
    background-color: #4CAF50;
    color: #fff;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }
</style>
