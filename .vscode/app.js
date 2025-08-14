// Product Data
const products = [
  { id: 1, name: 'Autumn Comfort',    price: 2450, img: 'Shoe-1.png', rating: 4.5, reviews: 34 },
  { id: 2, name: 'Winter Grip',       price: 2650, img: 'Shoe-2.png', rating: 4.2, reviews: 27 },
  { id: 3, name: 'Breathable Sport',  price: 2850, img: 'Shoe-3.png', rating: 4.8, reviews: 58 },
  { id: 4, name: 'Urban Classic',     price: 2200, img: 'Shoe-4.png', rating: 4.1, reviews: 19 },
  { id: 5, name: 'Trailblazer',       price: 3050, img: 'Shoe-5.png', rating: 4.7, reviews: 42 }
];

// Helper: star HTML
function getStarHtml(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let html = '★'.repeat(fullStars);
  if (halfStar) html += '½';
  return html;
}

// Render all products with Order button
function renderProducts() {
  const container = document.getElementById('allProducts');
  container.innerHTML = products.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">৳${p.price}</p>
        <div class="rating">
          <span class="stars">${getStarHtml(p.rating)}</span>
          <span class="review-count">(${p.reviews} reviews)</span>
        </div>
        <button class="order-btn">Order Now</button>
      </div>
    </div>
  `).join('');
}

// Initialize Order Modal behavior
function initOrderModal() {
  const modal = document.getElementById('orderModal');
  const closeBtn = modal.querySelector('.close');
  const form = document.getElementById('orderForm');
  const nameEl = document.getElementById('orderProductName');
  const idInput = document.getElementById('orderProductId');

  // Open modal on Order button click
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.order-btn');
    if (!btn) return;
    const card = btn.closest('.product-card');
    const product = products.find(p => p.id == card.dataset.id);
    nameEl.textContent = product.name;
    idInput.value = product.id;
    modal.classList.remove('hidden');
  });

  // Close modal
  closeBtn.onclick = () => modal.classList.add('hidden');

  // Handle form submit
  form.onsubmit = e => {
    e.preventDefault();
    const order = {
      productId: form.orderProductId.value,
      quantity: form.orderQuantity.value,
      customer: form.orderName.value.trim(),
      email: form.orderEmail.value.trim()
    };
    console.log('Order received:', order);
    alert(`Thank you, ${order.customer}! Your order for ${order.quantity} x ${nameEl.textContent} is confirmed.`);
    modal.classList.add('hidden');
    form.reset();
  };
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initOrderModal();
});
