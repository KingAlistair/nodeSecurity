<script>
  import { Router, Route } from "svelte-navigator";
  import LoginPage from "./pages/LoginPage.svelte";
  import MainPage from "./pages/MainPage.svelte";
  import WaitingRoom from "./pages/WaitingRoom.svelte";
  import ContactPage from "./pages/ContactPage.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Register from "./pages/Register.svelte"
  import PrivateRoute from "./components/PrivateRoute.svelte";
</script>

<Navbar />

<Router>
  <PrivateRoute path="/waitingRoom" component={WaitingRoom} />
  <PrivateRoute path="/contact" component={ContactPage} />
  <Route path="/" component={MainPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/register" component={Register} />
</Router>
