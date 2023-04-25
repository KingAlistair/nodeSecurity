<script>
  import { user, logout } from "../store.js";
  import { navigate } from 'svelte-navigator';

  let loggedIn = false;
  let username = "guest";

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
    } else {
      loggedIn = false;
      username = "guest";
    };
  };
</script>

<nav class="navbar">
  <ul>
    <li>
      <a href="/">Main Page</a>
    </li>
    {#if loggedIn}
      <li>
        <a href="/admin">Admin Page</a>
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
  .navbar {
    background-color: #333;
    color: white;
  }

  .navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .navbar li {
    float: left;
  }

  .navbar li.right {
    float: right;
  }

  .navbar li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  .navbar li a:hover {
    background-color: #ddd;
    color: black;
  }

  .navbar button {
    background-color: inherit;
    color: white;
    border: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 16px;
  }

  .navbar button:hover {
    background-color: #ddd;
    color: black;
  }
</style>
