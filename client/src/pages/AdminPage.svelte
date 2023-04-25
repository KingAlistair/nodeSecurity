
  <div class="admin-page">
    <h1>Welcome, Admins!</h1>
    <p>You are logged in as {{ username }}</p>
  </div>


<style>
  .admin-page {
    padding: 20px;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 10px;
  }
</style>

<script>
  import { user } from "../store.js";

  const username = $user.username;
</script>
