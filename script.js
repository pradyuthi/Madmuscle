// Load cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Toggle size selection with deselect option
function selectSize(element, size) {
  const siblings = element.parentNode.querySelectorAll('.size-circle');
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
  } else {
    siblings.forEach(sib => sib.classList.remove('selected'));
    element.classList.add('selected');
  }
}

// Show toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Add product with selected size to cart
function addToCart(button) {
  const productDiv = button.closest('.product');
  const name = productDiv.querySelector('h2').textContent;
  const selectedSize = productDiv.querySelector('.size-circle.selected');

  if (!selectedSize) {
    alert('Please select a size before adding to cart!');
    return;
  }

  const size = selectedSize.textContent;
  const price = 1000; // example price

  // Check if product + size already in cart to increment qty
  let existingItem = cart.find(item => item.name === name && item.size === size);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, size, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  showToast(`${name} (${size}) added to cart!`);
  updateCartCount();
}

// Update cart count badge in navbar
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

// Initialize cart count on page load
updateCartCount();

// Listen for cart updates (if using multiple tabs)
window.addEventListener('storage', () => {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
});
function showCartPopup() {
  const popup = document.getElementById('cart-popup');
  popup.classList.add('show');

  // Hide the popup after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}

