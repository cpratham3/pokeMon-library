document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "http://localhost:8080/api";

  function handleResponse(response) {
    if (!response.ok)
      throw new Error("Server responded with " + response.status);
    return response.json();
  }

  function handleError(error) {
    console.error("Error:", error);
    alert("An error occurred, check the console for details.");
  }

  function register(username, password) {
    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(handleResponse)
      .then(() => alert("Registration successful. Please log in."))
      .catch(handleError);
  }

  function login(username, password) {
    const credentials = btoa(username + ":" + password);
    localStorage.setItem("credentials", credentials);
    toggleUI(true);
    alert("Assumed login successful for demonstration purposes.");
  }

  function loadPokemons() {
    const credentials = localStorage.getItem("credentials");
    fetch(`${BASE_URL}/pokemon`, {
      method: "GET",
      headers: { Authorization: `Basic ${credentials}` },
    })
      .then(handleResponse)
      .then((data) => {
        const pokemonList = document.getElementById("pokemonList");
        pokemonList.innerHTML = data.content
          .map(
            (pokemon) =>
              `<li class="list-group-item">${pokemon.id}: ${pokemon.name}</li>`
          )
          .join("");
      })
      .catch(handleError);
  }

  function submitReview(reviewpokemonId, reviewTitle, reviewText, reviewStars) {
    const credentials = localStorage.getItem("credentials");
    fetch(`${BASE_URL}/pokemon/${reviewpokemonId}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: reviewTitle,
        content: reviewText,
        stars: reviewStars,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Review submitted successfully.");
          // Optionally, clear the form fields or refresh the page to show the new review
          document.getElementById("reviewTitle").value = "";
          document.getElementById("reviewText").value = "";
          document.getElementById("reviewStars").value = 1; // Reset to a default value
        } else {
          alert("Failed to submit review. Status code: " + response.status);
        }
      })
      .catch((error) => console.error("Error submitting review:", error));
  }

  function toggleUI(loggedIn) {
    document.getElementById("authSection").style.display = loggedIn
      ? "none"
      : "block";
    document.getElementById("pokemonSection").style.display = loggedIn
      ? "block"
      : "none";
    document.getElementById("reviewSection").style.display = loggedIn
      ? "block"
      : "none";
  }

  document.getElementById("loginButton").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
  });

  document
    .getElementById("registerButton")
    .addEventListener("click", function () {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      register(username, password);
    });

  document
    .getElementById("loadPokemonButton")
    .addEventListener("click", loadPokemons);

  document
    .getElementById("submitReviewButton")
    .addEventListener("click", function () {
      const reviewpokemonId = document.getElementById("reviewPokemonId").value;
      const reviewTitle = document.getElementById("reviewTitle").value;
      const reviewText = document.getElementById("reviewText").value;
      const reviewStars = document.getElementById("reviewStars").value;
      submitReview(reviewpokemonId, reviewTitle, reviewText, reviewStars);
    });
});

// 888888888888888888888888888888888888888888
// document.addEventListener("DOMContentLoaded", function () {
//   const BASE_URL = "http://localhost:8080/api";

//   document.getElementById("loginButton").addEventListener("click", function () {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     login(username, password);
//   });

//   document
//     .getElementById("registerButton")
//     .addEventListener("click", function () {
//       const username = document.getElementById("username").value;
//       const password = document.getElementById("password").value;
//       register(username, password);
//     });

//   document
//     .getElementById("loadPokemonButton")
//     .addEventListener("click", loadPokemons);

//   function register(username, password) {
//     fetch(`${BASE_URL}/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("Registration successful. Please log in.");
//         } else {
//           alert("Registration failed. Please try again.");
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   }

//   function login(username, password) {
//     // Storing credentials for Basic Auth
//     const credentials = btoa(username + ":" + password);
//     localStorage.setItem("credentials", credentials);
//     toggleUI(true);
//     alert("Assumed login successful for demonstration.");
//   }

//   function loadPokemons() {
//     const credentials = localStorage.getItem("credentials");
//     fetch(`${BASE_URL}/pokemon`, {
//       method: "GET",
//       headers: { Authorization: `Basic ${credentials}` },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(
//             "Failed to load pokemons, server responded with " + response.status
//           );
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const pokemonList = document.getElementById("pokemonList");
//         pokemonList.innerHTML = data
//           .map((pokemon) => `<li class="list-group-item">${pokemon.name}</li>`)
//           .join("");
//       })
//       .catch((error) => console.error("Error loading Pokémons:", error));
//   }

//   function toggleUI(loggedIn) {
//     document.getElementById("authSection").style.display = loggedIn
//       ? "none"
//       : "block";
//     document.getElementById("pokemonSection").style.display = loggedIn
//       ? "block"
//       : "none";
//     document.getElementById("reviewSection").style.display = loggedIn
//       ? "block"
//       : "none";
//   }
// });

//uses JWT, doesnt work yet

// const BASE_URL = "http://localhost:8080/api";

// document.getElementById("registerButton").addEventListener("click", function () {
//     const username = document.getElementById("registerUsername").value;
//     const password = document.getElementById("registerPassword").value;
//     register(username, password);
// });

// document.getElementById("loginButton").addEventListener("click", function () {
//     const username = document.getElementById("loginUsername").value;
//     const password = document.getElementById("loginPassword").value;
//     login(username, password);
// });

// document.getElementById("loadPokemonButton").addEventListener("click", loadPokemons);

// function register(username, password) {
//       fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Registration successful. Please log in.");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     })
//     .catch((error) => console.error("Error:", error));
// }

// function login(username, password) {
//     fetch(`${BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         localStorage.setItem("jwtToken", data.token);
//         toggleUI(true); // A function to toggle UI based on login state
//     })
//     .catch(error => console.error("Login Error:", error));
// }

// function loadPokemons() {
//     const token = localStorage.getItem("jwtToken");
//     fetch(`${BASE_URL}/pokemon`, {
//         method: "GET",
//         headers: { "Authorization": `Bearer ${token}` },
//     })
//     .then(response => response.json())
//     .then(data => {
//         const pokemonList = document.getElementById("pokemonList");
//         pokemonList.innerHTML = data.map(pokemon => `<li class="list-group-item">${pokemon.name}</li>`).join("");
//     })
//     .catch(error => console.error("Error loading Pokémons:", error));
// }

// function toggleUI(loggedIn) {
//     if (loggedIn) {
//         document.getElementById("authSection").style.display = "none";
//         document.getElementById("pokemonSection").style.display = "block";
//         document.getElementById("reviewSection").style.display = "block";
//     } else {
//         document.getElementById("authSection").style.display = "block";
//         document.getElementById("pokemonSection").style.display = "none";
//         document.getElementById("reviewSection").style.display = "none";
//     }
// }
//*************************************************************************************************** */

// const BASE_URL = "http://localhost:8080/api";

// document
//   .getElementById("registerButton")
//   .addEventListener("click", function () {
//     const username = document.getElementById("registerUsername").value;
//     const password = document.getElementById("registerPassword").value;
//     register(username, password);
//   });

// document.getElementById("loginButton").addEventListener("click", function () {
//   const username = document.getElementById("loginUsername").value;
//   const password = document.getElementById("loginPassword").value;
//   login(username, password);
// });

// document.getElementById("logoutButton").addEventListener("click", logout);

// document
//   .getElementById("loadPokemonButton")
//   .addEventListener("click", loadPokemons);

// document
//   .getElementById("viewPokemonButton")
//   .addEventListener("click", function () {
//     const id = document.getElementById("detailPokemonId").value;
//     viewPokemon(id);
//   });

// document
//   .getElementById("submitReviewButton")
//   .addEventListener("click", function () {
//     const pokemonId = document.getElementById("reviewPokemonId").value;
//     const review = document.getElementById("reviewText").value;
//     addReview(pokemonId, review);
//   });

// document
//   .getElementById("loadReviewsButton")
//   .addEventListener("click", function () {
//     const pokemonId = document.getElementById("reviewsForPokemonId").value;
//     loadReviews(pokemonId);
//   });

// function register(username, password) {
//   fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Registration successful. Please log in.");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     })
//     .catch((error) => console.error("Error:", error));
// }

// function login(username, password) {
//   fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Login failed");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       localStorage.setItem("jwtToken", data.token); // Store the JWT token received from the backend

//       // UI updates after successful login
//       document.getElementById("authSection").style.display = "none";
//       document.getElementById("logoutButton").style.display = "block";
//       document.getElementById("pokemonSection").style.display = "block";
//       document.getElementById("reviewSection").style.display = "block";
//       document.getElementById("pokemonDetailSection").style.display = "block";
//       document.getElementById("reviewsListSection").style.display = "block";
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Login failed: Incorrect username or password.");
//     });
// }

// function logout() {
//   localStorage.removeItem("jwtToken"); // Remove the stored JWT token

//   // UI updates after logout
//   document.getElementById("authSection").style.display = "block";
//   document.getElementById("logoutButton").style.display = "none";
//   document.getElementById("pokemonSection").style.display = "none";
//   document.getElementById("reviewSection").style.display = "none";
//   document.getElementById("pokemonDetailSection").style.display = "none";
//   document.getElementById("reviewsListSection").style.display = "none";
// }

// function loadPokemons() {
//   const token = localStorage.getItem("jwtToken");
//   if (!token) {
//     console.error("No JWT token found. Please log in first.");
//     return; // Exit the function if no token
//   }
//   fetch(`${BASE_URL}/pokemon`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const pokemonList = document.getElementById("pokemonList");
//       pokemonList.innerHTML = ""; // Clear previous list
//       data.forEach((pokemon) => {
//         let li = document.createElement("li");
//         li.textContent = `${pokemon.name}`;
//         pokemonList.appendChild(li);
//       });
//     })
//     .catch((error) => console.error("Error loading pokemons:", error));
// }

// function viewPokemon(id) {
//   const token = localStorage.getItem("jwtToken");
//   if (!token) {
//     console.error("No JWT token found. Please log in first.");
//     return; // Exit the function if no token
//   }
//   fetch(`${BASE_URL}/pokemon/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const detailDiv = document.getElementById("pokemonDetail");
//       detailDiv.innerHTML = `ID: ${data.id}, Name: ${
//         data.name
//       }, Details: ${JSON.stringify(data)}`;
//     })
//     .catch((error) => console.error("Error fetching Pokémon details:", error));
// }

// function addReview(pokemonId, review) {
//   const token = localStorage.getItem("jwtToken");
//   if (!token) {
//     console.error("No JWT token found. Please log in first.");
//     return; // Exit the function if no token
//   }
//   fetch(`${BASE_URL}/pokemon/${pokemonId}/reviews`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ text: review }), // Assuming your API expects a 'text' field for the review
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to add review");
//       }
//       alert("Review added successfully!");
//       // Optionally reload reviews for the Pokémon
//       loadReviews(pokemonId);
//     })
//     .catch((error) => console.error("Error adding review:", error));
// }

// function loadReviews(pokemonId) {
//   const token = localStorage.getItem("jwtToken");
//   if (!token) {
//     console.error("No JWT token found. Please log in first.");
//     return; // Exit the function if no token
//   }
//   fetch(`${BASE_URL}/pokemon/${pokemonId}/reviews`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to load reviews");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const reviewsList = document.getElementById("reviewsList");
//       reviewsList.innerHTML = ""; // Clear current list
//       data.forEach((review) => {
//         const li = document.createElement("li");
//         // Adjust the following line as per your actual review object structure
//         li.textContent = `Review by ${review.reviewer}: ${review.text}`;
//         reviewsList.appendChild(li);
//       });
//     })
//     .catch((error) => console.error("Error loading reviews:", error));
// }
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const BASE_URL = "http://localhost:8080/api";

// document
//   .getElementById("registerButton")
//   .addEventListener("click", function () {
//     const username = document.getElementById("registerUsername").value;
//     const password = document.getElementById("registerPassword").value;
//     register(username, password);
//   });

// document.getElementById("loginButton").addEventListener("click", function () {
//   const username = document.getElementById("loginUsername").value;
//   const password = document.getElementById("loginPassword").value;
//   login(username, password);
// });

// document.getElementById("logoutButton").addEventListener("click", logout);

// document
//   .getElementById("loadPokemonButton")
//   .addEventListener("click", loadPokemons);

// document
//   .getElementById("viewPokemonButton")
//   .addEventListener("click", function () {
//     const id = document.getElementById("detailPokemonId").value;
//     viewPokemon(id);
//   });

// document
//   .getElementById("submitReviewButton")
//   .addEventListener("click", function () {
//     const pokemonId = document.getElementById("reviewPokemonId").value;
//     const review = document.getElementById("reviewText").value;
//     addReview(pokemonId, review);
//   });

// document
//   .getElementById("loadReviewsButton")
//   .addEventListener("click", function () {
//     const pokemonId = document.getElementById("reviewsForPokemonId").value;
//     loadReviews(pokemonId);
//   });

// function register(username, password) {
//   fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Registration successful. Please log in.");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     })
//     .catch((error) => console.error("Error:", error));
// }
// // Login Function
// function login(username, password) {
//   fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Login failed");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Login successful:", data);
//       localStorage.setItem("jwtToken", data.token); // Store the JWT token received from the backend

//       // UI updates after successful login
//       document.getElementById("authSection").style.display = "none";
//       document.getElementById("logoutButton").style.display = "block";
//       document.getElementById("pokemonSection").style.display = "block";
//       document.getElementById("reviewSection").style.display = "block";
//       document.getElementById("pokemonDetailSection").style.display = "block";
//       document.getElementById("reviewsListSection").style.display = "block";
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Login failed: Incorrect username or password.");
//     });
// }

// // Logout Function
// function logout() {
//   localStorage.removeItem("jwtToken"); // Remove the stored JWT token

//   // UI updates after logout
//   document.getElementById("authSection").style.display = "block";
//   document.getElementById("logoutButton").style.display = "none";
//   document.getElementById("pokemonSection").style.display = "none";
//   document.getElementById("reviewSection").style.display = "none";
//   document.getElementById("pokemonDetailSection").style.display = "none";
//   document.getElementById("reviewsListSection").style.display = "none";
// }

// // Load Pokemons Function
// function loadPokemons() {
//   const token = localStorage.getItem("jwtToken");
//   fetch(`${BASE_URL}/pokemon`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const pokemonList = document.getElementById("pokemonList");
//       pokemonList.innerHTML = ""; // Clear previous list
//       data.pokemons.forEach((pokemon) => {
//         // Assuming the backend sends an array of Pokémons
//         let li = document.createElement("li");
//         li.textContent = `${pokemon.name}`;
//         pokemonList.appendChild(li);
//       });
//     })
//     .catch((error) => console.error("Error loading pokemons:", error));
// }

// // View Specific Pokemon Function
// function viewPokemon(id) {
//   const credentials = sessionStorage.getItem("credentials");
//   fetch(`${BASE_URL}/pokemon/${id}`, {
//     method: "GET",
//     headers: { Authorization: "Basic " + credentials },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const detailDiv = document.getElementById("pokemonDetail");
//       detailDiv.innerHTML = `ID: ${data.id}, Name: ${data.name}`; // Adjust according to your data structure
//     })
//     .catch((error) => console.error("Error:", error));
// }

// // Add Review Function
// function addReview(pokemonId, review) {
//   const credentials = sessionStorage.getItem("credentials");
//   fetch(`${BASE_URL}/pokemon/${pokemonId}/reviews`, {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + credentials,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ review }), // Adjust according to your API's expected format
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Review added successfully");
//         loadReviews(pokemonId); // Refresh the reviews list
//       } else {
//         alert("Failed to add review");
//       }
//     })
//     .catch((error) => console.error("Error:", error));
// }

// // Load Reviews Function
// function loadReviews(pokemonId) {
//   const credentials = sessionStorage.getItem("credentials");
//   fetch(`${BASE_URL}/pokemon/${pokemonId}/reviews`, {
//     method: "GET",
//     headers: { Authorization: "Basic " + credentials },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const reviewsList = document.getElementById("reviewsList");
//       reviewsList.innerHTML = ""; // Clear current list
//       data.forEach((review) => {
//         const li = document.createElement("li");
//         li.textContent = `Review: ${review.text}`; // Adjust based on your review object structure
//         reviewsList.appendChild(li);
//       });
//     })
//     .catch((error) => console.error("Error:", error));
// }
