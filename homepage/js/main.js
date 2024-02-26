import {API_URL} from "../../modules/API.js";
const genreButtons = document.querySelectorAll(".genreBtn");
const showAllButton = document.getElementById("showAllBtn");

function sortGenre(event) {
    const selectedGenre = event.target.dataset.genre;
    if (selectedGenre) {
        fetchMovies(selectedGenre);
    }
}

function showAllMovies() {
    fetchMovies()
}

genreButtons.forEach(button => {
    button.addEventListener("click", sortGenre);
});

showAllButton.addEventListener("click", showAllMovies);

fetchMovies();

async function fetchMovies(genre) {
    const content = document.getElementById("titles");
    content.innerHTML = "<p>Loading...  </p>";
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        content.innerHTML = "";

        data.forEach((movies) => {
            if (!genre || (movies.onSale && movies.genre === genre) || (!movies.onSale && movies.genre === genre)) {
                content.innerHTML += `
                <a href="../productpage/product.html?id=${movies.id}">
                <img src=${movies.image} />
                <h2>${movies.title}</h2>   
                <p class="price">${movies.onSale ? `<s>${movies.price}kr ,-</s>` : `${movies.price}kr ,-`}</p>
                ${movies.onSale ? `<p class="discountedPrice">${movies.discountedPrice}kr ,-</p>` : ''}
                </a>`;
            }
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        content.innerHTML = "<p>Error loading movies</p>";
    }
}
