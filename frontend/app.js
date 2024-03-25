const BASE_URL = "http://localhost:8080/api";

document
  .getElementById("registerButton")
  .addEventListener("click", function () {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    register(username, password);
  });

document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  login(username, password);
});

document.getElementById("logoutButton").addEventListener("click", logout);

document
  .getElementById("loadPokemonButton")
  .addEventListener("click", loadPokemons);

document
  .getElementById("viewPokemonButton")
  .addEventListener("click", function () {
    const id = document.getElementById("detailPokemonId").value;
    viewPokemon(id);
  });

document
  .getElementById("submitReviewButton")
  .addEventListener("click", function () {
    const pokemonId = document.getElementById("reviewPokemonId").value;
    const review = document.getElementById("reviewText").value;
    addReview(pokemonId, review);
  });

document
  .getElementById("loadReviewsButton")
  .addEventListener("click", function () {
    const pokemonId = document.getElementById("reviewsForPokemonId").value;
    loadReviews(pokemonId);
  });

function register(username, password) {
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Registration successful. Please log in.");
      } else {
        alert("Registration failed. Please try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
// Login Function
function login(username, password) {
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login successful:", data);
      localStorage.setItem("jwtToken", data.token); // Store the JWT token received from the backend

      // UI updates after successful login
      document.getElementById("authSection").style.display = "none";
      document.getElementById("logoutButton").style.display = "block";
      document.getElementById("pokemonSection").style.display = "block";
      document.getElementById("reviewSection").style.display = "block";
      document.getElementById("pokemonDetailSection").style.display = "block";
      document.getElementById("reviewsListSection").style.display = "block";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Login failed: Incorrect username or password.");
    });
}

// Logout Function
function logout() {
  localStorage.removeItem("jwtToken"); // Remove the stored JWT token

  // UI updates after logout
  document.getElementById("authSection").style.display = "block";
  document.getElementById("logoutButton").style.display = "none";
  document.getElementById("pokemonSection").style.display = "none";
  document.getElementById("reviewSection").style.display = "none";
  document.getElementById("pokemonDetailSection").style.display = "none";
  document.getElementById("reviewsListSection").style.display = "none";
}

// Load Pokemons Function
function loadPokemons() {
  const token = localStorage.getItem("jwtToken");
  fetch(`${BASE_URL}/pokemon`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const pokemonList = document.getElementById("pokemonList");
      pokemonList.innerHTML = ""; // Clear previous list
      data.pokemons.forEach((pokemon) => {
        // Assuming the backend sends an array of Pokémons
        let li = document.createElement("li");
        li.textContent = `${pokemon.name}`;
        pokemonList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error loading pokemons:", error));
}

// View Specific Pokemon Function
function viewPokemon(id) {
  const credentials = sessionStorage.getItem("credentials");
  fetch(`${BASE_URL}/pokemon/${id}`, {
    method: "GET",
    headers: { Authorization: "Basic " + credentials },
  })
    .then((response) => response.json())
    .then((data) => {
      const detailDiv = document.getElementById("pokemonDetail");
      detailDiv.innerHTML = `ID: ${data.id}, Name: ${data.name}`; // Adjust according to your data structure
    })
    .catch((error) => console.error("Error:", error));
}

// Add Review Function
function addReview(pokemonId, review) {
  const credentials = sessionStorage.getItem("credentials");
  fetch(`${BASE_URL}/pokemon/${pokemonId}/reviews`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + credentials,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review }), // Adjust according to your API's expected format
  })
    .then((response) => {
      if (response.ok) {
        alert("Review added successfully");
        loadReviews(pokemonId); // Refresh the reviews list
      } else {
        alert("Failed to add review");
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Load Reviews Function
function loadReviews(pokemonId) {
  const credentials = sessionStorage.getItem("credentials");
  fetch(`${BASE_URL}/pokemon/${pokemonId}/reviews`, {
    method: "GET",
    headers: { Authorization: "Basic " + credentials },
  })
    .then((response) => response.json())
    .then((data) => {
      const reviewsList = document.getElementById("reviewsList");
      reviewsList.innerHTML = ""; // Clear current list
      data.forEach((review) => {
        const li = document.createElement("li");
        li.textContent = `Review: ${review.text}`; // Adjust based on your review object structure
        reviewsList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error:", error));
}
