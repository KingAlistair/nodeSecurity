// Checks if token and the stored user data is valid
export async function authenticateUser() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:8080/user", {
      headers: { Authorization: accessToken },
    });
    const user = await response.json();
    if (user) {
      return { loggedIn: true, username: user.username };
    } else {
      return { loggedIn: false, username: "Guest" };
    }
  }