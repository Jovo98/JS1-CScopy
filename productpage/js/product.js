import {API_URL} from "../../modules/API.js";
const queryString = window.location.search;
const paramUrl = new URLSearchParams(queryString);
const movieId = paramUrl.get("id");
const movieContainer = document.getElementById("movieContainer");
const content = document.getElementById("content");
const addToCart = document.getElementById("cart")
const cartButton = document.getElementById("cartbutton")
const checkoutButton = document.getElementById("checkout")

let dataResult = [];
let cartItem = [];
async function fetchMovieId() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        dataResult = await response.json();
        let found = false;
        for (let i = 0; i < dataResult.length; i++) {
            if (dataResult[i].id === movieId) {
                displayMovie(dataResult[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            content.innerHTML = "Movie not found";
        }
    } catch (error) {
        content.innerHTML = "Error fetching data: " + error.message;
        cartButton.style.display = "none";
    }
}

fetchMovieId()

function displayMovie(dataResult) {
    if (dataResult && dataResult.onSale === false) {
        movieContainer.innerHTML = `
            <div>
                <img src="${dataResult.image}"/>
            </div>
            <div>
                <h2>${dataResult.title} (${dataResult.released})</h2>
                <p>${dataResult.description}</p>
                <p>Genre: ${dataResult.genre}</p>
                <p>Rating: ${dataResult.rating}/10</p>
                <p>${dataResult.price} kr ,-</p>
                <p>${dataResult.tags}</p>
                
            </div>`;
    } else if (dataResult && dataResult.onSale === true) {
        movieContainer.innerHTML = `
            <div>
                <img src="${dataResult.image}"/>
            </div>
            <div>
                <h2>${dataResult.title} (${dataResult.released})</h2>
                <p>${dataResult.description}</p>
                <p>Genre: ${dataResult.genre}</p>
                <p>Rating: ${dataResult.rating}/10</p>
                <p class="price"><s>${dataResult.price} kr ,-</s></p>
                <p class="discountedPrice">${dataResult.discountedPrice} kr ,-</p>
                <p>Tags: ${dataResult.tags}</p>
            </div>`;
    } else {
        movieContainer.innerHTML = "Invalid movie data";
    }
}

addToCart.addEventListener("click", () => {
    const selectedMovie = dataResult.find(movie => movie.id === movieId);
    if (selectedMovie) {
        saveToLocalStorage(selectedMovie);
        alert ("Successfully added movie to cart.")
    }
});

function saveToLocalStorage(selectedMovie) {
    if (localStorage.getItem("cartItem") === null) {
        localStorage.setItem("cartItem", "[]");
    }
    let cartItem = JSON.parse(localStorage.getItem("cartItem"));
    cartItem.push(selectedMovie);
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
}

checkoutButton.addEventListener("click", () => {
    if (localStorage.length === 0) {
        alert("No movies selected. Select a movie please:).");
    } else {
        window.location.href = "../checkoutpage/checkout.html";
    }
});
