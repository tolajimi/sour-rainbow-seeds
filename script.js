/* Sour Rainbow Seed Co. — Shop Logic */

const PRODUCTS = [
  {
    id: 'sr-5',
    name: 'Sour Rainbow — 5 Pack',
    seeds: 5,
    price: 45,
    original: 55,
    badge: 'Starter',
    meta: 'Feminized • Mostly Indica • ~63 days',
    emoji: '🍬',
    desc: 'Perfect sample pack of our flagship Rainbow Belts × SourD bx2 genetics.'
  },
  {
    id: 'sr-10',
    name: 'Sour Rainbow — 10 Pack',
    seeds: 10,
    price: 79,
    original: 95,
    badge: 'Most Popular',
    meta: 'Feminized • Mostly Indica • ~63 days',
    emoji: '🌈',
    desc: 'The sweet spot for collectors. More phenos to explore.'
  },
  {
    id: 'sr-20',
    name: 'Sour Rainbow — 20 Pack',
    seeds: 20,
    price: 139,
    original: 170,
    badge: 'Best Value',
    meta: 'Feminized • Mostly Indica • ~63 days',
    emoji: '💎',
    desc: 'Maximum value. Ideal for serious collectors and phenotype hunting.'
  },
  {
    id: 'sr-limited',
    name: 'Sour Rainbow — Limited Drop',
    seeds: 7,
    price: 65,
    original: null,
    badge: 'Limited',
    meta: 'Feminized • Hand-selected • Collector edition',
    emoji: '✨',
    desc: 'Small-batch release with extra care packaging and numbered packs.'
  }
];

let cart = JSON.parse(localStorage.getItem('sr_cart') || '[]');

// ---- Navigation ----
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// ---- Products ----
function renderProducts(targetId, filter = 'all') {
  const container = document.getElementById(targetId);
  if (!container) return;

  let list = PRODUCTS;
  if (filter !== 'all') {
    list = PRODUCTS.filter(p => String(p.seeds) === filter || (filter === 'limited' && p.id === 'sr-limited'));
  }

  // For home, show only first 3
  if (targetId === 'homeProducts') {
    list = PRODUCTS.slice(0, 3);
  }

  container.innerHTML = list.map(p => `
    <article class="product-card" data-seeds="${p.seeds}">
      <div class="product-image">
        <span class="product-emoji">${p.emoji}</span>
      </div>
      <div class="product-body">
        <span class="product-badge">${p.badge}</span>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-meta">${p.meta}</p>
        <div class="product-footer">
          <div class="product-price">
            $${p.price}
            ${p.original ? `<span>$${p.original}</span>` : ''}
          </div>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts('shopProducts', btn.dataset.filter);
  });
});

// ---- Cart ----
function saveCart() {
  localStorage.setItem('sr_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  countEl.textContent = totalItems;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    totalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return '';
    const line = p.price * item.qty;
    total += line;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-title">${p.name}</div>
          <div class="cart-item-meta">${p.seeds} seeds • $${p.price} each</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty('${p.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${p.id}', 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${p.id}')">Remove</button>
        </div>
        <div class="cart-item-price">$${line.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  totalEl.textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  showToast('Demo only — no real checkout. Thanks for vibing!');
  // In a real store this would redirect to Stripe / Shopify / etc.
  setTimeout(() => {
    cart = [];
    saveCart();
    toggleCart();
  }, 1800);
}

// ---- Toast ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// ---- Contact form (demo) ----
function handleContact(e) {
  e.preventDefault();
  showToast('Message received (demo). We\'ll get back to you!');
  e.target.reset();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('homeProducts');
  renderProducts('shopProducts');
  updateCartUI();
});
