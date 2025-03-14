// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartContainer = document.getElementById('cartContainer');
const cartClose = document.getElementById('cartClose');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const continueShopping = document.getElementById('continueShopping');
const checkout = document.getElementById('checkout');

// Open cart
cartIcon.addEventListener('click', () => {
    cartContainer.classList.add('active');
    overlay.classList.add('active');
});

// Close cart
cartClose.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
continueShopping.addEventListener('click', closeCart);

function closeCart() {
    cartContainer.classList.remove('active');
    overlay.classList.remove('active');
}

// Add to cart function
function addToCart(image, title, price) {
    // Check if item already in cart
    const existingItem = cart.find(item => item.image === image);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            image: image,   // Fixed: Changed from imgSrc to image
            title: title,
            price: parseFloat(price),  // Ensure price is a number
            quantity: 1
        });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCart();
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Show/hide empty cart message
    emptyCartMessage.style.display = cart.length === 0 ? 'block' : 'none';

    // Clear current cart items
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.appendChild(emptyCartMessage);
    } else {
        // Add each item to cart
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">₵${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: ₵${total.toFixed(2)}`;

    // Save updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
    }
    updateCart();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout
checkout.addEventListener('click', () => {
    if (cart.length > 0) {
        // Save the entire cart data to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Save total price
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        localStorage.setItem('cartTotal', total.toFixed(2));

        console.log("Cart saved to localStorage:", cart);
        console.log("Cart Total Saved:", total);

        // Redirect to the order confirmation page
        window.location.href = 'orderform.html';
    } else {
        alert('Your cart is empty!');
    }
});


// Display profile (if user is logged in)
function displayProfile() {
    let userName = localStorage.getItem("userName");
    if (userName) {
        let initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();
        document.getElementById("profile").textContent = initials;
    }
}
displayProfile();

// Load cart from localStorage when page loads
updateCart();
