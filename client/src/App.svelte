<script>
  import { Router, Route } from "svelte-navigator";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import LoginPage from "./pages/LoginPage.svelte";
  import MainPage from "./pages/MainPage.svelte";
  import WaitingRoom from "./pages/WaitingRoom.svelte";
  import ContactPage from "./pages/ContactPage.svelte";
  import Navbar from "./components/Navbar.svelte";
</script>

<Navbar />

<Router>
  <PrivateRoute path="/waitingRoom" component={WaitingRoom} />
  <PrivateRoute path="/contact" component={ContactPage} />
  <Route path="/" component={MainPage} />
  <Route path="/login" component={LoginPage} />
</Router>
