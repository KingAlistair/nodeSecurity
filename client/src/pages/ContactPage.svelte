<script>
    let name = "";
    let email = "";
    let message = "";
  
    async function sendEmail() {
      const response = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
  
      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Error sending email.");
      }
  
      // Clear the form fields
      name = "";
      email = "";
      message = "";
    };
    </script>

<div class="container">
  
<form on:submit|preventDefault={sendEmail}>
  <h2>Send us an email!</h2><br>
    <label>
      Name:
      <input type="text" bind:value={name} required />
    </label>
    <label>
      Email:
      <input type="email" bind:value={email} required />
    </label>
    <label>
      Message:
      <textarea bind:value={message} required />
    </label>
    <button type="submit">Send</button>
  </form>
</div>

  <style>
    @import url('../style/global.css');
    @import url('../style/contactPage.css');
</style>