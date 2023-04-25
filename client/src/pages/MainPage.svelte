<script>
  import { user } from "../store.js";
  import { navigate } from 'svelte-navigator';

  const username = $user.username;
  
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  let name = '';
  let email = '';
  let message = '';

  async function sendEmail() {
    const response = await fetch('http://localhost:8080/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      alert('Error sending email.');
    }

    // Clear the form fields
    name = '';
    email = '';
    message = '';
  }

</script>

<h1>Welcome {username}!</h1>

<button on:click={logout}>Logout</button>

<form on:submit|preventDefault={sendEmail}>
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
    <textarea bind:value={message} required></textarea>
  </label>
  <button type="submit">Send</button>
</form>