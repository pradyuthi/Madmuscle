let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartContainer = document.getElementById('cart-container');
const summaryTotal = document.getElementById('summary-total');
const summaryItems = document.getElementById('summary-items');

const productImages = {
  "Black Power Tee": "images/Blackshirt.jpg",
  "Blue Classic Tee": "images/Blueshirt.jpg",
  "Red Muscle Tee": "images/Redshirt.jpg"
};

function renderCart() {
  cartContainer.innerHTML = '';
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="font-size:1.2rem; color:#666;">Your cart is empty.</p>';
    summaryTotal.textContent = '₹0';
    summaryItems.textContent = '0';
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <img src="${productImages[item.name] || 'images/placeholder.png'}" alt="${item.name}" />
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-size">Size: ${item.size}</div>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
      <div class="item-price">₹${item.price * item.quantity}</div>
    `;

    cartContainer.appendChild(itemDiv);
  });

  updateSummary();
}

function updateSummary() {
  let total = 0;
  let totalItems = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    totalItems += item.quantity;
  });
  summaryTotal.textContent = `₹${total}`;
  summaryItems.textContent = totalItems;
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }
  saveAndRender();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

renderCart();
