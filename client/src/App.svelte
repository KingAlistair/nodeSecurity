<script>
  import { Router, Route } from "svelte-navigator";
  import LoginPage from "./pages/LoginPage.svelte";
  import MainPage from "./pages/MainPage.svelte";
  import AdminPage from "./pages/AdminPage.svelte";
  import Navbar from "./components/Navbar.svelte";
</script>

<Navbar />

<Router>
  <Route path="/login" component={LoginPage} />
  <Route path="/" component={MainPage}/>
  <Route path="/admin" component={AdminPage}/>
</Router>