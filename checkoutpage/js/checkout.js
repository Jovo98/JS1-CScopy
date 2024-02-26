const cartContainer = document.getElementById("cartContainer");
const totalPriceDisplay = document.getElementById("totalPrice");
const submitOrderButton = document.getElementById("submitOrderButton");
let totalPrice = 0;

const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];

if (cartItems.length > 0) {
    cartItems.forEach(item => {
        displayCartItem(item);
        updateTotalPrice(item);
    });
} else {
    cartContainer.innerHTML = "<p>No items in the cart.</p>";
}

function displayCartItem(item) {
    const cartItemElement = document.createElement("span");
    cartItemElement.innerHTML = `
        <div>
            <img id="checkoutImage" src="${item.image}" alt="${item.title}">
        </div>
        <div class="checkoutInfo">
            <h2>${item.title} (${item.released})</h2>
            <p>Price: ${item.onSale ? item.discountedPrice : item.price} kr ,-</p>
            <button class="removeItemButton" data-id="${item.id}">Remove</button>
        </div>
    `;
    cartContainer.appendChild(cartItemElement);
}

function updateTotalPrice(item) {
    totalPrice += item.onSale ? item.discountedPrice : item.price;
    totalPriceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} kr ,-`;
}

cartContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("removeItemButton")) {
        const itemIdToRemove = event.target.getAttribute("data-id");
        const removedItem = cartItems.find(item => item.id === itemIdToRemove);
        removeItemFromCart(itemIdToRemove, removedItem);
    }
});

function removeItemFromCart(itemIdToRemove) {
    const indexToRemove = cartItems.findIndex(item => item.id === itemIdToRemove);
    if (indexToRemove !== -1) {
        const removedItem = cartItems.splice(indexToRemove, 1)[0];
        localStorage.setItem("cartItem", JSON.stringify(cartItems));
        const itemToRemove = document.querySelector(`[data-id="${itemIdToRemove}"]`);
        if (itemToRemove) {
            itemToRemove.parentElement.parentElement.remove();
        }
        totalPrice -= removedItem.onSale ? removedItem.discountedPrice : removedItem.price;
        totalPriceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} kr ,`;
        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>No items in the cart.</p>";
        }
    }
}
submitOrderButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("No items in cart. Add items before submitting your order.");
    }
});
