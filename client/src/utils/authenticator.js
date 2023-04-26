// 
async function authenticateUser() {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch("http://localhost:8080/user", {
    headers: { Authorization: accessToken },
  });

  return await response.json();
}

  export default authenticateUser;