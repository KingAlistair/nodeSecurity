<script>
    let username = "";
    let password = "";
    let confirmPassword = "";
    let errorMessage = "";

    async function register() {
        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match";
            return;
        }

        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert("Registration was succesfull!")
            window.location.href = "/login";
        } else {
            errorMessage = "Error registering user";
        }
    }
</script>

<div class="container">
    <form on:submit|preventDefault={register}>
        <h2>Register</h2>
        <label>
            Username:
            <input type="text" bind:value={username} required />
        </label>
        <label>
            Password:
            <input type="password" bind:value={password} required />
        </label>
        <label>
            Confirm Password:
            <input type="password" bind:value={confirmPassword} required />
        </label>
        {#if errorMessage}
            <p>{errorMessage}</p>
        {/if}
        <button type="submit">Register</button>
    </form>
</div>

<style>
    @import url("../style/global.css");
</style>
