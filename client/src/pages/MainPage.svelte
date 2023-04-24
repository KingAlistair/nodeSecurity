<script>
  import { user } from "../store.js";
  import { navigate } from 'svelte-navigator';

  const username = $user.username;
  
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };
</script>

<h1>Welcome {username}!</h1>

<button on:click={logout}>Logout</button>
