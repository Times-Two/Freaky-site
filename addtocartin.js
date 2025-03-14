  // Cart functionality
  let cart = [];
        
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
  function addToCart(imgSrc, title, price) {
      // Check if item already in cart
      const existingItem = cart.find(item => item.imgSrc === imgSrc);
      
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({
              imgSrc: imgSrc,
              title: title,
              price: price,
              quantity: 1
          });
      }
      
      updateCart();
      
      // Show notification
      alert('Item added to cart!');
  }
  
  // Update cart display
  function updateCart() {
      // Update cart count
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Show/hide empty cart message
      if (cart.length === 0) {
          emptyCartMessage.style.display = 'block';
      } else {
          emptyCartMessage.style.display = 'none';
      }
      
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
                  <img src="${item.imgSrc}" alt="${item.title}">
                  <div class="cart-item-details">
                      <div class="cart-item-title">${item.title}</div>
                      <div class="cart-item-price">₵${item.price}</div>
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
      cartTotal.textContent = `Total: ₵${total}`;
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
        // Calculate total price
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Debugging: Check if the total is being stored
        console.log("Saving total to localStorage:", total);

        // Save total to localStorage
        localStorage.setItem('cartTotal', total.toFixed(2));

        // Debugging: Check if localStorage saved the total
        console.log("Cart Total Saved:", localStorage.getItem('cartTotal'));

        // Redirect to the payment page
        window.location.href = 'createAccount.html';
    } else {
        alert('Your cart is empty!');
    }
});





