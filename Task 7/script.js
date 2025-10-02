const userContainer = document.getElementById("user-container");
const reloadBtn = document.getElementById("reloadBtn");
const searchBar = document.getElementById("searchBar");

let allUsers = []; // store fetched users

async function fetchUsers() {
  userContainer.innerHTML = "<p>Loading data...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    allUsers = users; // save data
    displayUsers(allUsers);

  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">❌ Failed to load data. Check your internet connection.</p>`;
    console.error("Fetch Error:", error);
  }
}

function displayUsers(users) {
  userContainer.innerHTML = "";

  if (users.length === 0) {
    userContainer.innerHTML = "<p>No users found ❌</p>";
    return;
  }

  users.forEach(user => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;

    userContainer.appendChild(userCard);
  });
}

// Search filter
searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm)
  );
  displayUsers(filteredUsers);
});

// Initial fetch
fetchUsers();

// Reload button
reloadBtn.addEventListener("click", fetchUsers);
