// Product Data
const products = [
  { id: 1, name: 'Autumn Comfort',     price: 2450, img: 'Shoe-1.png', rating: 4.5, reviews: 34 },
  { id: 2, name: 'Winter Grip',         price: 2650, img: 'Shoe-2.png', rating: 4.2, reviews: 27 },
  { id: 3, name: 'Breathable Sport',    price: 2850, img: 'Shoe-3.png', rating: 4.8, reviews: 58 },
  { id: 4, name: 'Urban Classic',       price: 2200, img: 'Shoe-4.png', rating: 4.1, reviews: 19 },
  { id: 5, name: 'Trailblazer',         price: 3050, img: 'Shoe-5.png', rating: 4.7, reviews: 42 }
];

// Helper: star HTML
function getStarHtml(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let html = '★'.repeat(fullStars);
  if (halfStar) html += '½';
  return html;
}

// Render grid helper
function renderGrid(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">৳${p.price}</p>
        <div class="rating">
          <span class="stars">${getStarHtml(p.rating)}</span>
          <span class="review-count">(${p.reviews} reviews)</span>
        </div>
      </div>
    </div>
  `).join('');
}

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Homepage featured
  renderGrid('featuredProducts', products.slice(0, 3));
  // Products page all
  renderGrid('allProducts', products);
});

// Login/Register modal logic
const modal = document.getElementById('modal');
document.getElementById('loginBtn').onclick = () => modal.classList.remove('hidden');
document.querySelectorAll('.modal .close').forEach(btn => btn.onclick = () => btn.closest('.modal').classList.add('hidden'));
document.getElementById('authForm').onsubmit = e => {
  e.preventDefault();
  const email = e.target.email.value.trim().toLowerCase();
  const isNew = !localStorage.getItem(email);
  localStorage.setItem(email, 'registered');
  if (isNew) alert('Registered! Enjoy 20% off your first order.');
  modal.classList.add('hidden');
};
