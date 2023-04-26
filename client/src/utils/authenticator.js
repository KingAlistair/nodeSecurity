async function authenticateUser() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:8080/user", {
      headers: { Authorization: accessToken },
    });
    const user = await response.json();
    if (user) {
        return true;
    };
    return false;
  };

  export default authenticateUser;