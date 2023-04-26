<script>
   import { Toaster, toast } from "svelte-french-toast";
    toast.success("Welcome in the waiting room!")
</script>

<div class="container">
  <h1>Enjoy your stay!</h1>
  <img src="images\admin_room.jpg" alt="Admin_room" />
</div>
<Toaster />
<style>
  @import url("../style/global.css");
</style>
