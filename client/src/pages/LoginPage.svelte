<script>
import { user, login } from "../store.js";
  import Login from "../components/Login.svelte";
  import { navigate } from "svelte-navigator";

  function handleLoginSuccess() {
  store.update(storeData => {
    console.log(storeData.user)
    storeData.loggedIn = true;
    storeData.user = username;
    return storeData;
  });
  navigate('/main');
}
</script>

<div class="container">
  <h1>Login</h1>
  <Login onSuccess={handleLoginSuccess} />
</div>
