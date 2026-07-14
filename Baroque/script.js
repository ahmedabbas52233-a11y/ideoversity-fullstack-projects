// ===================== DATA =====================
const products = [
  {
    id: 1, name: "Eid Lawn 26 - Unstitched 3 Piece", price: 8490, oldPrice: 9990,
    category: "unstitched", image: "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800",
      "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
      "https://baroque.pk/cdn/shop/files/94_40f6c30f-a06f-4cc3-a62f-9371aecae524.jpg?v=1780735216&width=800"
    ],
    sku: "BL-EID26-001", description: "Premium lawn fabric with intricate digital print. Includes shirt, dupatta, and trouser fabric. Perfect for Eid celebrations.",
    sizes: ["S", "M", "L", "XL"], badge: "New"
  },
  {
    id: 2, name: "Eid Lawn 26 - Stitched 2 Piece", price: 12490, oldPrice: null,
    category: "stitched", image: "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
      "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800"
    ],
    sku: "BL-EID26-002", description: "Ready-to-wear stitched ensemble featuring embroidered neckline and detailed sleeves. Comfortable yet elegant.",
    sizes: ["S", "M", "L"], badge: "Bestseller"
  },
  {
    id: 3, name: "Chantelle Unstitched Lawn", price: 7490, oldPrice: 8990,
    category: "chantelle", image: "https://baroque.pk/cdn/shop/files/94_40f6c30f-a06f-4cc3-a62f-9371aecae524.jpg?v=1780735216&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/94_40f6c30f-a06f-4cc3-a62f-9371aecae524.jpg?v=1780735216&width=800",
      "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800"
    ],
    sku: "BL-CHA-001", description: "Chantelle collection unstitched 3-piece suit with floral digital print and embroidered borders.",
    sizes: ["S", "M", "L", "XL"], badge: "Sale"
  },
  {
    id: 4, name: "Chantelle Stitched Kurti", price: 6490, oldPrice: null,
    category: "chantelle-stitched", image: "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800",
      "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800"
    ],
    sku: "BL-CHA-002", description: "Elegant stitched kurti from the Chantelle collection. Features delicate embroidery and premium finishing.",
    sizes: ["S", "M", "L"], badge: null
  },
  {
    id: 5, name: "Summer Essential - Lawn Shirt", price: 3490, oldPrice: null,
    category: "summer", image: "https://baroque.pk/cdn/shop/files/1_8e420fd7-9e3d-4823-9f51-5af5d28f5868.jpg?v=1781592186&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/1_8e420fd7-9e3d-4823-9f51-5af5d28f5868.jpg?v=1781592186&width=800",
      "https://baroque.pk/cdn/shop/files/MAin_BAnner92_dcb4ebc5-a30b-4971-a0c0-a284b333335c.jpg?v=1781705283&width=800"
    ],
    sku: "BL-SUM-001", description: "Breathable lawn shirt perfect for summer days. Features a contemporary print with classic Baroque quality.",
    sizes: ["XS", "S", "M", "L", "XL"], badge: null
  },
  {
    id: 6, name: "Formal Evening Wear - Chiffon", price: 18490, oldPrice: 21990,
    category: "formals", image: "https://baroque.pk/cdn/shop/files/MAin_BAnner92_dcb4ebc5-a30b-4971-a0c0-a284b333335c.jpg?v=1781705283&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/MAin_BAnner92_dcb4ebc5-a30b-4971-a0c0-a284b333335c.jpg?v=1781705283&width=800",
      "https://baroque.pk/cdn/shop/files/1_8e420fd7-9e3d-4823-9f51-5af5d28f5868.jpg?v=1781592186&width=800"
    ],
    sku: "BL-FOR-001", description: "Luxurious chiffon formal wear with intricate hand embellishments. Perfect for weddings and evening events.",
    sizes: ["S", "M", "L"], badge: "Premium"
  },
  {
    id: 7, name: "Embroidered Dupatta - Organza", price: 2490, oldPrice: null,
    category: "dupattas", image: "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800"
    ],
    sku: "BL-DUP-001", description: "Lightweight organza dupatta with delicate embroidery and sequin detailing. A versatile addition to any outfit.",
    sizes: ["One Size"], badge: null
  },
  {
    id: 8, name: "Essential Ensemble - 2 Piece", price: 5490, oldPrice: null,
    category: "ensembles", image: "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
      "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800"
    ],
    sku: "BL-ENS-001", description: "Coordinated 2-piece ensemble featuring a printed shirt and matching trousers. Comfortable everyday elegance.",
    sizes: ["S", "M", "L", "XL"], badge: null
  }
];

// ===================== CART =====================
function getCart() {
  return JSON.parse(localStorage.getItem('baroqueCart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('baroqueCart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, size, qty) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, size, qty });
  }
  saveCart(cart);
  showToast('Added to bag successfully');
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart(cart);
  initCart();
  showToast('Removed from bag');
}

function updateCartQty(productId, size, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item) {
    item.qty += delta;
    if (item.qty < 1) item.qty = 1;
    saveCart(cart);
    initCart();
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

// ===================== TOAST =====================
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===================== POPUP =====================
function subscribePopup(e) {
  e.preventDefault();
  const email = document.getElementById('popupEmail').value;
  if (email && email.includes('@')) {
    document.getElementById('popup').classList.remove('active');
    localStorage.setItem('popupClosed', 'true');
    showToast('Welcome! Your 10% OFF code is WELCOME10');
  } else {
    alert('Please enter a valid email.');
  }
}

function subscribeFooter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (email && email.includes('@')) {
    showToast('Subscribed successfully!');
    e.target.reset();
  }
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
  localStorage.setItem('popupClosed', 'true');
}

// ===================== SHOP =====================
function initShop() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    document.getElementById('shopTitle').textContent = cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(cb => {
      if (cb.value === cat || cb.value === cat.split('-')[0]) cb.checked = true;
    });
  }
  filterProducts();
  updateCartBadge();
}

function filterProducts() {
  const checkedCats = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked')).map(cb => cb.value);
  const minPrice = parseFloat(document.getElementById('priceMin')?.value) || 0;
  const maxPrice = parseFloat(document.getElementById('priceMax')?.value) || Infinity;
  const sort = document.getElementById('sortSelect')?.value || 'featured';

  let filtered = products.filter(p => {
    const catMatch = checkedCats.length === 0 || checkedCats.includes(p.category) || checkedCats.some(c => p.category.includes(c));
    const priceMatch = p.price >= minPrice && p.price <= maxPrice;
    return catMatch && priceMatch;
  });

  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'newest') filtered.sort((a, b) => b.id - a.id);

  renderProductGrid(filtered);
  document.getElementById('resultCount').textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
}

function sortProducts() {
  filterProducts();
}

function renderProductGrid(productList) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = productList.map(p => `
    <div class="product-card" onclick="location.href='product.html?id=${p.id}'">
      <div class="product-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="product-wishlist" onclick="event.stopPropagation(); showToast('Added to wishlist')">&#9825;</button>
      </div>
      <div class="product-card-info">
        <h3>${p.name}</h3>
        <div class="price">PKR ${p.price.toLocaleString()}${p.oldPrice ? `<span class="old">PKR ${p.oldPrice.toLocaleString()}</span>` : ''}</div>
      </div>
    </div>
  `).join('');
}

// ===================== PRODUCT DETAIL =====================
function initProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  if (!product) {
    document.getElementById('productDetail').innerHTML = '<div style="text-align:center;padding:80px 20px;"><h2>Product not found</h2><a href="shop.html" style="color:#000;margin-top:20px;display:inline-block;">Back to Shop</a></div>';
    return;
  }

  document.getElementById('mainImage').src = product.images[0];
  document.getElementById('galleryThumbs').innerHTML = product.images.map((img, i) =>
    `<img src="${img}" class="${i === 0 ? 'active' : ''}" onclick="setMainImage('${img}', this)" alt="Thumbnail">`
  ).join('');

  document.getElementById('productInfo').innerHTML = `
    <h1>${product.name}</h1>
    <div class="sku">SKU: ${product.sku}</div>
    <div class="price">PKR ${product.price.toLocaleString()}</div>
    <div class="description">${product.description}</div>
    <div class="size-selector">
      <label>Select Size</label>
      <div class="size-options" id="sizeOptions">
        ${product.sizes.map((s, i) => `<button class="size-option ${i === 0 ? 'active' : ''}" onclick="selectSize(this)">${s}</button>`).join('')}
      </div>
    </div>
    <div class="quantity-selector">
      <label>Quantity</label>
      <div class="qty-controls">
        <button onclick="changeQty(-1)">−</button>
        <input type="text" value="1" id="qtyInput" readonly>
        <button onclick="changeQty(1)">+</button>
      </div>
    </div>
    <div class="product-actions">
      <button class="btn-add-cart" onclick="addProductToCart(${product.id})">Add to Bag</button>
      <button class="btn-wishlist" onclick="showToast('Added to wishlist')">&#9825;</button>
    </div>
    <div class="product-meta">
      <p><strong>Category:</strong> ${product.category.replace('-', ' ').toUpperCase()}</p>
      <p><strong>Shipping:</strong> Free delivery on orders over PKR 5,000</p>
      <p><strong>Returns:</strong> Easy 7-day exchange policy</p>
    </div>
  `;
  updateCartBadge();
}

function setMainImage(src, thumb) {
  document.getElementById('mainImage').src = src;
  document.querySelectorAll('.gallery-thumbs img').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function selectSize(btn) {
  document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  input.value = val;
}

function addProductToCart(productId) {
  const activeSize = document.querySelector('.size-option.active');
  const size = activeSize ? activeSize.textContent : 'M';
  const qty = parseInt(document.getElementById('qtyInput').value) || 1;
  addToCart(productId, size, qty);
}

// ===================== CART PAGE =====================
function initCart() {
  const cart = getCart();
  const itemsContainer = document.getElementById('cartItems');
  const summaryContainer = document.getElementById('cartSummary');
  const emptyCart = document.getElementById('emptyCart');
  const layout = document.getElementById('cartLayout');

  if (cart.length === 0) {
    if (layout) layout.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'block';
    updateCartBadge();
    return;
  }

  if (layout) layout.style.display = 'grid';
  if (emptyCart) emptyCart.style.display = 'none';

  itemsContainer.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <div class="variant">Size: ${item.size}</div>
          <div class="qty-controls" style="border:none;margin-bottom:10px;">
            <button onclick="updateCartQty(${item.id}, '${item.size}', -1)">−</button>
            <input type="text" value="${item.qty}" readonly style="width:40px;">
            <button onclick="updateCartQty(${item.id}, '${item.size}', 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
        </div>
        <div class="cart-item-price">PKR ${(product.price * item.qty).toLocaleString()}</div>
      </div>
    `;
  }).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  summaryContainer.innerHTML = `
    <h2>Order Summary</h2>
    <div class="summary-row"><span>Subtotal</span><span>PKR ${subtotal.toLocaleString()}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : 'PKR ' + shipping.toLocaleString()}</span></div>
    <div class="summary-row total"><span>Total</span><span>PKR ${total.toLocaleString()}</span></div>
    <button class="checkout-btn" onclick="location.href='checkout.html'">Proceed to Checkout</button>
  `;
  updateCartBadge();
}

// ===================== CHECKOUT =====================
function initCheckout() {
  const cart = getCart();
  const container = document.getElementById('checkoutSummary');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p>No items in cart. <a href="shop.html">Shop now</a></p>';
    return;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  container.innerHTML = `
    <h2 style="font-size:18px;letter-spacing:2px;text-transform:uppercase;margin-bottom:25px;font-weight:400;">Order Summary</h2>
    ${cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <div class="order-item">
          <img src="${product.image}" alt="${product.name}">
          <div class="order-item-info">
            <h4>${product.name}</h4>
            <p>Qty: ${item.qty} | Size: ${item.size}</p>
            <p><strong>PKR ${(product.price * item.qty).toLocaleString()}</strong></p>
          </div>
        </div>
      `;
    }).join('')}
    <div class="summary-row" style="margin-top:20px;padding-top:20px;border-top:1px solid #eee;"><span>Subtotal</span><span>PKR ${subtotal.toLocaleString()}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : 'PKR ' + shipping.toLocaleString()}</span></div>
    <div class="summary-row total" style="font-size:18px;font-weight:600;margin-top:15px;padding-top:15px;border-top:1px solid #ddd;"><span>Total</span><span>PKR ${total.toLocaleString()}</span></div>
  `;
}

function placeOrder() {
  showToast('Order placed successfully! Thank you for shopping.');
  localStorage.removeItem('baroqueCart');
  updateCartBadge();
  setTimeout(() => location.href = 'index.html', 2000);
}

// ===================== ACCOUNT =====================
function switchTab(tab) {
  document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.account-form').forEach(f => f.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tab + 'Form').classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  showToast('Welcome back! You are now signed in.');
  setTimeout(() => location.href = 'index.html', 1000);
}

function handleRegister(e) {
  e.preventDefault();
  showToast('Account created successfully! Welcome to Baroque.');
  setTimeout(() => location.href = 'index.html', 1000);
}

// ===================== CONTACT =====================
function handleContact(e) {
  e.preventDefault();
  showToast('Message sent! We will get back to you soon.');
  e.target.reset();
}

// ===================== MOBILE MENU =====================
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('open');
}

// ===================== INIT =====================
window.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  if (!localStorage.getItem('popupClosed') && document.getElementById('popup')) {
    setTimeout(() => document.getElementById('popup').classList.add('active'), 2000);
  }
});
