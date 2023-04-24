<script>
  import { Router, Route } from "svelte-navigator";
  import LoginPage from "./pages/LoginPage.svelte";
  import MainPage from "./pages/MainPage.svelte";
</script>

<Router>
  <Route path="/" component={LoginPage} />
  <Route path="/main" component={MainPage} />
</Router>
