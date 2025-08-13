/* Product Data */
const products = [
  { id:1, name:'Autumn Comfort', price:2450, img:'Shoe-1.png' },
  { id:2, name:'Winter Grip', price:2650, img:'Shoe-2.png' },
  { id:3, name:'Breathable Sport', price:2850, img:'Shoe-3.png' },
  // …add all products here
];

let user = { email:null, mobile:null, isNew:false };

/* Utility to render cards */
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

/* Featured + All products */
document.addEventListener('DOMContentLoaded', () => {
  renderGrid('featuredProducts', products.slice(0,3));
  renderGrid('allProducts', products);
});

/* Login/Register Modal Logic */
const modal = document.getElementById('modal');
const loginBtn = document.getElementById('loginBtn');
const closeBtns = document.querySelectorAll('.modal .close');
loginBtn.onclick = () => modal.classList.remove('hidden');
closeBtns.forEach(btn => btn.onclick = () => btn.closest('.modal').classList.add('hidden'));

document.getElementById('authForm').onsubmit = e => {
  e.preventDefault();
  const email = e.target.email.value;
  const mobile = e.target.mobile.value;
  // Fake “new user” check
  user = { email, mobile, isNew: !localStorage.getItem(email) };
  if (user.isNew) {
    localStorage.setItem(email, 'registered');
    alert('Registered! You get 20% off your first order.');
  }
  modal.classList.add('hidden');
};

/* Order Flow */
document.body.addEventListener('click', e => {
  if (e.target.closest('.product-card')) {
    if (!user.email) return alert('Please login/register first.');
    const card = e.target.closest('.product-card');
    const prod = products.find(p => p.id == card.dataset.id);
    const finalPrice = user.isNew ? prod.price * 0.8 : prod.price;
    document.getElementById('orderDetails').innerHTML = `
      <p>${prod.name}</p>
      <p>Price: ৳${finalPrice.toFixed(2)}</p>
    `;
    document.getElementById('orderModal').classList.remove('hidden');
  }
});
document.getElementById('confirmOrderBtn').onclick = () => {
  document.getElementById('orderModal').classList.add('hidden');
  alert('Order confirmed! Thank you.');
};
