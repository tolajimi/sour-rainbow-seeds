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

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem('sr_cart') || '[]');
  if (!Array.isArray(cart)) cart = [];
} catch (e) {
  cart = [];
}

// ---- Navigation ----
function showSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === id);
  });

  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) mobileNav.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

// ---- Products ----
function renderProducts(targetId, filter = 'all') {
  const container = document.getElementById(targetId);
  if (!container) return;

  let list = PRODUCTS.slice();

  if (filter !== 'all') {
    list = PRODUCTS.filter(p =>
      String(p.seeds) === filter || (filter === 'limited' && p.id === 'sr-limited')
    );
  }

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

// ---- Cart ----
function saveCart() {
  try {
    localStorage.setItem('sr_cart', JSON.stringify(cart));
  } catch (e) {}
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
  if (!countEl || !itemsEl || !totalEl) return;

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
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

// ---- Crypto Checkout ----
const CRYPTO_WALLETS = {
  // Replace these with your real receiving addresses
  btc:  'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  eth:  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
  usdt: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
  ltc:  'ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
};

const CRYPTO_LABELS = {
  btc: 'Bitcoin (BTC)',
  eth: 'Ethereum (ETH)',
  usdt: 'Tether (USDT)',
  ltc: 'Litecoin (LTC)'
};

let currentOrderId = null;
let currentCoin = 'btc';
let checkoutTotal = 0;
let discountedTotal = 0;

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SR-${ts}-${rand}`;
}

function openCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }

  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');

  document.getElementById('checkoutStep1').style.display = 'block';
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep3').style.display = 'none';

  checkoutTotal = getCartTotal();
  discountedTotal = Math.round(checkoutTotal * 0.9 * 100) / 100;

  const summaryEl = document.getElementById('checkoutOrderSummary');
  let html = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return '';
    return `<div class="checkout-line"><span>${p.name} × ${item.qty}</span><span>$${(p.price * item.qty).toFixed(2)}</span></div>`;
  }).join('');
  html += `<div class="checkout-line checkout-line-total"><span>Subtotal</span><span>$${checkoutTotal.toFixed(2)}</span></div>`;
  summaryEl.innerHTML = html;

  document.getElementById('checkoutDiscountedTotal').textContent = `$${discountedTotal.toFixed(2)}`;
  document.getElementById('checkoutEmail').value = '';

  document.getElementById('checkoutOverlay').classList.add('open');
}

function closeCheckout(e) {
  if (e && e.target !== e.currentTarget && e.type === 'click') return;
  document.getElementById('checkoutOverlay')?.classList.remove('open');
}

function goToCryptoPayment() {
  const email = document.getElementById('checkoutEmail').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email');
    return;
  }

  currentOrderId = generateOrderId();
  document.getElementById('checkoutOrderId').textContent = currentOrderId;
  document.getElementById('cryptoAmountDisplay').textContent = `$${discountedTotal.toFixed(2)} USD`;
  document.getElementById('txidInput').value = '';

  selectCoin('btc');

  document.getElementById('checkoutStep1').style.display = 'none';
  document.getElementById('checkoutStep2').style.display = 'block';
}

function backToStep1() {
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep1').style.display = 'block';
}

function selectCoin(coin) {
  currentCoin = coin;
  document.querySelectorAll('.crypto-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.coin === coin);
  });
  document.getElementById('walletAddress').textContent = CRYPTO_WALLETS[coin] || '—';
}

function copyWallet() {
  const addr = CRYPTO_WALLETS[currentCoin];
  if (!addr) return;
  navigator.clipboard.writeText(addr).then(() => {
    showToast('Address copied!');
  }).catch(() => {
    showToast('Could not copy — please select and copy manually');
  });
}

function submitCryptoOrder() {
  const email = document.getElementById('checkoutEmail').value.trim();
  const txid = document.getElementById('txidInput').value.trim();

  if (!txid || txid.length < 10) {
    showToast('Please paste a valid Transaction ID (TXID)');
    return;
  }

  const order = {
    orderId: currentOrderId,
    email,
    coin: currentCoin,
    coinLabel: CRYPTO_LABELS[currentCoin],
    amountUsd: discountedTotal,
    originalUsd: checkoutTotal,
    txid,
    items: cart.map(item => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      return { id: item.id, name: p?.name, qty: item.qty, price: p?.price };
    }),
    createdAt: new Date().toISOString()
  };

  try {
    const orders = JSON.parse(localStorage.getItem('sr_orders') || '[]');
    orders.push(order);
    localStorage.setItem('sr_orders', JSON.stringify(orders));
  } catch (e) {}

  console.log('New crypto order:', order);

  document.getElementById('finalOrderId').textContent = currentOrderId;
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep3').style.display = 'block';
}

function clearCartAfterOrder() {
  cart = [];
  saveCart();
  showToast('Thank you! Order received.');
}

// ---- Toast ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// ---- Contact form (demo) ----
function handleContact(e) {
  e.preventDefault();
  showToast("Message received (demo). We'll get back to you!");
  e.target.reset();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts('shopProducts', btn.dataset.filter);
    });
  });

  renderProducts('homeProducts');
  renderProducts('shopProducts');
  updateCartUI();
});
