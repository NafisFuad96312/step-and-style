// Product Data
const products = [
  { id:1, name:'Autumn Comfort', price:2450, img:'Shoe-1.png' },
  { id:2, name:'Winter Grip', price:2650, img:'Shoe-2.png' },
  { id:3, name:'Breathable Sport', price:2850, img:'Shoe-3.png' },
  // Add more products here as needed
];

let user = { email:null, mobile:null, isNew:false };

// Render grid helper
function renderGrid(containerId, list) {
  const container = document.getElementById(containerId);
  container.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">৳${p.price}</p>
    </div>
  `).join('');
}

// On load
document.addEventListener('DOMContentLoaded', () => {
  renderGrid('featuredProducts', products.slice(0,3));
  renderGrid('allProducts', products);
});

// Login/Register modal
const modal = document.getElementById('modal');
document.getElementById('loginBtn').onclick = () => modal.classList.remove('hidden');
document.querySelectorAll('.modal .close').forEach(btn => btn.onclick = () => btn.closest('.modal').classList.add('hidden'));

document.getElementById('authForm').onsubmit = e => {
  e.preventDefault();
  const email = e.target.email.value;
  user.isNew = !localStorage.getItem(email);
  user.email = email;
  user.mobile = e.target.mobile.value;
  if (user.isNew) {
    localStorage.setItem(email, 'registered');
    alert('Registered! You get 20% off your first order.');
  }
  modal.classList.add('hidden');
};

// Order flow
document.body.addEventListener('click', e => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  if (!user.email) return alert('Please login/register first.');
  const prod = products.find(p => p.id == card.dataset.id);
  const finalPrice = user.isNew ? (prod.price * 0.8).toFixed(2) : prod.price;
  document.getElementById('orderDetails').innerHTML = `
    <p>${prod.name}</p>
    <p>Price: ৳${finalPrice}</p>
  `;
  document.getElementById('orderModal').classList.remove('hidden');
});

document.getElementById('confirmOrderBtn').onclick = () => {
  document.getElementById('orderModal').classList.add('hidden');
  alert('Order confirmed! Thank you.');
};
