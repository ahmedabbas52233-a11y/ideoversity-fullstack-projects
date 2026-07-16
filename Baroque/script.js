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
    sizes: ["S", "M", "L", "XL"], badge: "New", stock: 12, rating: 4.8, reviews: 24
  },
  {
    id: 2, name: "Eid Lawn 26 - Stitched 2 Piece", price: 12490, oldPrice: null,
    category: "stitched", image: "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
      "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800"
    ],
    sku: "BL-EID26-002", description: "Ready-to-wear stitched ensemble featuring embroidered neckline and detailed sleeves. Comfortable yet elegant.",
    sizes: ["S", "M", "L"], badge: "Bestseller", stock: 8, rating: 4.9, reviews: 56
  },
  {
    id: 3, name: "Chantelle Unstitched Lawn", price: 7490, oldPrice: 8990,
    category: "chantelle", image: "https://baroque.pk/cdn/shop/files/94_40f6c30f-a06f-4cc3-a62f-9371aecae524.jpg?v=1780735216&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/94_40f6c30f-a06f-4cc3-a62f-9371aecae524.jpg?v=1780735216&width=800",
      "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800"
    ],
    sku: "BL-CHA-001", description: "Chantelle collection unstitched 3-piece suit with floral digital print and embroidered borders.",
    sizes: ["S", "M", "L", "XL"], badge: "Sale", stock: 5, rating: 4.6, reviews: 18
  },
  {
    id: 4, name: "Chantelle Stitched Kurti", price: 6490, oldPrice: null,
    category: "chantelle-stitched", image: "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800",
      "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800"
    ],
    sku: "BL-CHA-002", description: "Elegant stitched kurti from the Chantelle collection. Features delicate embroidery and premium finishing.",
    sizes: ["S", "M", "L"], badge: null, stock: 15, rating: 4.7, reviews: 31
  },
  {
    id: 5, name: "Summer Essential - Lawn Shirt", price: 3490, oldPrice: null,
    category: "summer", image: "https://baroque.pk/cdn/shop/files/1_8e420fd7-9e3d-4823-9f51-5af5d28f5868.jpg?v=1781592186&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/1_8e420fd7-9e3d-4823-9f51-5af5d28f5868.jpg?v=1781592186&width=800",
      "https://baroque.pk/cdn/shop/files/MAin_BAnner92_dcb4ebc5-a30b-4971-a0c0-a284b333335c.jpg?v=1781705283&width=800"
    ],
    sku: "BL-SUM-001", description: "Breathable lawn shirt perfect for summer days. Features a contemporary print with classic Baroque quality.",
    sizes: ["XS", "S", "M", "L", "XL"], badge: null, stock: 20, rating: 4.5, reviews: 12
  },
  {
    id: 6, name: "Formal Evening Wear - Chiffon", price: 18490, oldPrice: 21990,
    category: "formals", image: "https://baroque.pk/cdn/shop/files/MAin_BAnner92_dcb4ebc5-a30b-4971-a0c0-a284b333335c.jpg?v=1781705283&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/MAin_BAnner92_dcb4ebc5-a30b-4971-a0c0-a284b333335c.jpg?v=1781705283&width=800",
      "https://baroque.pk/cdn/shop/files/1_8e420fd7-9e3d-4823-9f51-5af5d28f5868.jpg?v=1781592186&width=800"
    ],
    sku: "BL-FOR-001", description: "Luxurious chiffon formal wear with intricate hand embellishments. Perfect for weddings and evening events.",
    sizes: ["S", "M", "L"], badge: "Premium", stock: 3, rating: 4.9, reviews: 42
  },
  {
    id: 7, name: "Embroidered Dupatta - Organza", price: 2490, oldPrice: null,
    category: "dupattas", image: "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/66_bb64a81d-6882-43c1-8d92-4745f409c4db.jpg?v=1781700736&width=800"
    ],
    sku: "BL-DUP-001", description: "Lightweight organza dupatta with delicate embroidery and sequin detailing. A versatile addition to any outfit.",
    sizes: ["One Size"], badge: null, stock: 25, rating: 4.4, reviews: 8
  },
  {
    id: 8, name: "Essential Ensemble - 2 Piece", price: 5490, oldPrice: null,
    category: "ensembles", image: "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
    images: [
      "https://baroque.pk/cdn/shop/files/89_573350eb-e4ef-45d1-82a8-f645319cc398.jpg?v=1781700782&width=800",
      "https://baroque.pk/cdn/shop/files/71_a7f44a07-f169-4212-af39-74a87a6c9c5a.jpg?v=1781703427&width=800"
    ],
    sku: "BL-ENS-001", description: "Coordinated 2-piece ensemble featuring a printed shirt and matching trousers. Comfortable everyday elegance.",
    sizes: ["S", "M", "L", "XL"], badge: null, stock: 18, rating: 4.6, reviews: 22
  }
];

const reviews = [
  { name: "Ayesha K.", rating: 5, date: "2026-06-15", text: "Absolutely stunning fabric quality. The embroidery is even more beautiful in person. Highly recommend!", productId: 1 },
  { name: "Fatima R.", rating: 4, date: "2026-06-10", text: "Love the design but sizing runs a bit small. Order one size up.", productId: 1 },
  { name: "Sana M.", rating: 5, date: "2026-05-28", text: "Perfect for Eid. Got so many compliments. Will definitely buy again.", productId: 2 },
  { name: "Zara H.", rating: 5, date: "2026-05-20", text: "The Chantelle collection never disappoints. Premium quality as always.", productId: 3 },
  { name: "Nadia A.", rating: 4, date: "2026-04-15", text: "Beautiful formal wear. Delivery was quick and packaging was elegant.", productId: 6 },
];

// ===================== STORAGE HELPERS =====================
function getCart() { return JSON.parse(localStorage.getItem('baroqueCart')) || []; }
function saveCart(cart) { localStorage.setItem('baroqueCart', JSON.stringify(cart)); updateCartBadge(); }
function getWishlist() { return JSON.parse(localStorage.getItem('baroqueWishlist')) || []; }
function saveWishlist(list) { localStorage.setItem('baroqueWishlist', JSON.stringify(list)); updateWishlistIcons(); }
function getRecentlyViewed() { return JSON.parse(localStorage.getItem('baroqueRecent')) || []; }
function saveRecentlyViewed(list) { localStorage.setItem('baroqueRecent', JSON.stringify(list)); }
function getOrders() { return JSON.parse(localStorage.getItem('baroqueOrders')) || []; }
function saveOrders(orders) { localStorage.setItem('baroqueOrders', JSON.stringify(orders)); }
function getCoupon() { return localStorage.getItem('baroqueCoupon') || ''; }
function saveCoupon(code) { localStorage.setItem('baroqueCoupon', code); }
function getLoggedIn() { return localStorage.getItem('baroqueLoggedIn') === 'true'; }
function setLoggedIn(v) { localStorage.setItem('baroqueLoggedIn', v ? 'true' : 'false'); }

// ===================== CART =====================
function addToCart(productId, size, qty) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) { existing.qty += qty; }
  else { cart.push({ id: productId, size, qty }); }
  saveCart(cart);
  showToast('Added to bag successfully');
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart(cart);
  if (document.getElementById('cartItems')) initCart();
  showToast('Removed from bag');
}

function moveToWishlist(productId, size) {
  removeFromCart(productId, size);
  const list = getWishlist();
  if (!list.includes(productId)) { list.push(productId); saveWishlist(list); }
  showToast('Moved to wishlist');
}

function updateCartQty(productId, size, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item) {
    item.qty += delta;
    if (item.qty < 1) item.qty = 1;
    saveCart(cart);
    if (document.getElementById('cartItems')) initCart();
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getDiscount() {
  const coupon = getCoupon();
  const subtotal = getCartTotal();
  if (coupon === 'WELCOME10') return Math.round(subtotal * 0.10);
  return 0;
}

// ===================== WISHLIST =====================
function toggleWishlist(productId, btn) {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx > -1) { list.splice(idx, 1); showToast('Removed from wishlist'); }
  else { list.push(productId); showToast('Added to wishlist'); }
  saveWishlist(list);
  if (btn) {
    btn.classList.toggle('active');
    btn.innerHTML = idx > -1 ? '&#9825;' : '&#10084;';
  }
  if (document.getElementById('wishlistGrid')) initWishlist();
}

function updateWishlistIcons() {
  const list = getWishlist();
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    const card = btn.closest('.product-card');
    if (!card) return;
    const href = card.getAttribute('onclick') || '';
    const match = href.match(/id=(\d+)/);
    const pid = match ? parseInt(match[1]) : null;
    if (pid && list.includes(pid)) {
      btn.classList.add('active');
      btn.innerHTML = '&#10084;';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '&#9825;';
    }
  });
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const container = btn.closest('.product-info');
    if (!container) return;
    const h1 = container.querySelector('h1');
    if (!h1) return;
    const product = products.find(p => p.name === h1.textContent);
    if (product && list.includes(product.id)) {
      btn.classList.add('active');
      btn.innerHTML = '&#10084;';
    }
  });
}

// ===================== RECENTLY VIEWED =====================
function trackView(productId) {
  let recent = getRecentlyViewed();
  recent = recent.filter(id => id !== productId);
  recent.unshift(productId);
  if (recent.length > 8) recent = recent.slice(0, 8);
  saveRecentlyViewed(recent);
}

function renderRecentlyViewed() {
  const container = document.getElementById('recentlyViewed');
  if (!container) return;
  const recent = getRecentlyViewed();
  if (recent.length < 2) { container.style.display = 'none'; return; }
  const recentProducts = recent.map(id => products.find(p => p.id === id)).filter(Boolean);
  if (recentProducts.length < 2) { container.style.display = 'none'; return; }
  container.style.display = 'block';
  container.innerHTML = '<h2>Recently Viewed</h2><div class="recently-scroll">' + recentProducts.map(p => renderProductCard(p)).join('') + '</div>';
  updateWishlistIcons();
}

// ===================== TOAST =====================
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===================== POPUP =====================
function subscribePopup(e) {
  e.preventDefault();
  const email = document.getElementById('popupEmail').value;
  if (email && email.includes('@')) {
    document.querySelector('.popup-form').style.display = 'none';
    document.querySelector('.popup-success').classList.add('active');
    localStorage.setItem('popupClosed', 'true');
    saveCoupon('WELCOME10');
  } else {
    alert('Please enter a valid email.');
  }
}

function subscribeFooter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (email && email.includes('@')) {
    const btn = e.target.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Subscribed!';
    showToast('Thanks! Check your email for 10% off with WELCOME10');
    saveCoupon('WELCOME10');
    e.target.reset();
    setTimeout(() => btn.textContent = original, 3000);
  }
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
  localStorage.setItem('popupClosed', 'true');
}

// ===================== SEARCH =====================
function openSearch() {
  document.getElementById('searchOverlay').classList.add('active');
  document.getElementById('searchInput').focus();
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('active');
}

function doSearch(query) {
  const results = document.getElementById('searchResults');
  if (!results) return;
  if (!query || query.length < 2) { results.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q) || p.sku.toLowerCase().includes(q));
  if (matches.length === 0) {
    results.innerHTML = '<div class="search-no-results">No products found. Try a different search.</div>';
    return;
  }
  results.innerHTML = matches.map(p =>
    '<div class="search-result-item" onclick="location.href='product.html?id=' + p.id + ''">' +
    '<img src="' + p.image + '" alt="' + p.name + '">' +
    '<div><h4>' + p.name + '</h4><div class="price">PKR ' + p.price.toLocaleString() + '</div></div>' +
    '</div>'
  ).join('');
}

// ===================== MOBILE MENU =====================
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('navMenu').classList.remove('open');
}

// ===================== HEADER SCROLL =====================
function handleHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}

// ===================== SCROLL TO TOP =====================
function handleScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  if (window.scrollY > 300) btn.classList.add('visible');
  else btn.classList.remove('visible');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================== PRODUCT CARD RENDERER =====================
function renderProductCard(p) {
  const isWished = getWishlist().includes(p.id);
  return '<div class="product-card" onclick="location.href='product.html?id=' + p.id + ''">' +
    '<div class="product-card-img">' +
    '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
    (p.badge ? '<span class="product-badge">' + p.badge + '</span>' : '') +
    '<button class="product-wishlist ' + (isWished ? 'active' : '') + '" onclick="event.stopPropagation(); toggleWishlist(' + p.id + ', this)">' + (isWished ? '&#10084;' : '&#9825;') + '</button>' +
    '<div class="quick-add" onclick="event.stopPropagation(); quickAdd(' + p.id + ')">Quick Add</div>' +
    '</div>' +
    '<div class="product-card-info">' +
    '<h3>' + p.name + '</h3>' +
    '<div class="price">PKR ' + p.price.toLocaleString() + (p.oldPrice ? '<span class="old">PKR ' + p.oldPrice.toLocaleString() + '</span>' : '') + '</div>' +
    '</div>' +
    '</div>';
}

function quickAdd(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const size = product.sizes[0];
  addToCart(productId, size, 1);
}

// ===================== SHOP =====================
function initShop() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const sort = params.get('sort');
  if (cat) {
    const titleEl = document.getElementById('shopTitle');
    if (titleEl) titleEl.textContent = cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
      if (cb.value === cat || cb.value === cat.split('-')[0]) cb.checked = true;
    });
  }
  if (sort) {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = sort;
  }
  filterProducts();
  updateCartBadge();
  updateWishlistIcons();
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
  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = 'Showing ' + filtered.length + ' product' + (filtered.length !== 1 ? 's' : '');
}

function sortProducts() { filterProducts(); }

function renderProductGrid(productList) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = productList.map(p => renderProductCard(p)).join('');
  updateWishlistIcons();
}

// ===================== PRODUCT DETAIL =====================
function initProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  if (!product) {
    const detail = document.getElementById('productDetail');
    if (detail) detail.innerHTML = '<div style="text-align:center;padding:80px 20px;"><h2>Product not found</h2><a href="shop.html" style="color:#000;margin-top:20px;display:inline-block;">Back to Shop</a></div>';
    return;
  }

  trackView(id);

  const mainImg = document.getElementById('mainImage');
  if (mainImg) mainImg.src = product.images[0];

  const thumbs = document.getElementById('galleryThumbs');
  if (thumbs) thumbs.innerHTML = product.images.map((img, i) =>
    '<img src="' + img + '" class="' + (i === 0 ? 'active' : '') + '" onclick="setMainImage('' + img + '', this)" alt="Thumbnail">'
  ).join('');

  const isWished = getWishlist().includes(product.id);
  const stockClass = product.stock > 10 ? 'in' : product.stock > 0 ? 'low' : 'out';
  const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Only ' + product.stock + ' left!' : 'Out of Stock';

  const info = document.getElementById('productInfo');
  if (info) info.innerHTML =
    '<h1>' + product.name + '</h1>' +
    '<div class="sku">SKU: ' + product.sku + '</div>' +
    '<div class="price">PKR ' + product.price.toLocaleString() + '</div>' +
    '<div class="stock ' + stockClass + '">' + stockText + '</div>' +
    '<div class="product-rating">' +
    '<span class="stars">' + '&#9733;'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '&#9733;' : '') + '&#9734;'.repeat(5 - Math.ceil(product.rating)) + '</span>' +
    '<span class="review-count">' + product.rating + ' (' + product.reviews + ' reviews)</span>' +
    '</div>' +
    '<div class="accordion">' +
    '<div class="accordion-item open">' +
    '<div class="accordion-header" onclick="toggleAccordion(this)">Description <span class="icon">+</span></div>' +
    '<div class="accordion-body">' + product.description + '</div>' +
    '</div>' +
    '<div class="accordion-item">' +
    '<div class="accordion-header" onclick="toggleAccordion(this)">Fabric Details <span class="icon">+</span></div>' +
    '<div class="accordion-body">Premium quality fabric with digital print. Shirt: 3.0 meters, Dupatta: 2.5 meters, Trouser: 2.5 meters. Fabric: 100% Pure Lawn.</div>' +
    '</div>' +
    '<div class="accordion-item">' +
    '<div class="accordion-header" onclick="toggleAccordion(this)">Care Instructions <span class="icon">+</span></div>' +
    '<div class="accordion-body">Dry clean recommended. Hand wash in cold water with mild detergent. Do not bleach. Iron on medium heat.</div>' +
    '</div>' +
    '<div class="accordion-item">' +
    '<div class="accordion-header" onclick="toggleAccordion(this)">Shipping & Returns <span class="icon">+</span></div>' +
    '<div class="accordion-body">Free shipping on orders over PKR 5,000. Standard delivery: 3-5 business days. Express: 1-2 business days. Easy 7-day exchange policy.</div>' +
    '</div>' +
    '</div>' +
    '<div class="size-selector">' +
    '<div class="size-selector-header">' +
    '<label>Select Size</label>' +
    '<span class="size-guide-link" onclick="openSizeGuide()">Size Guide</span>' +
    '</div>' +
    '<div class="size-options" id="sizeOptions">' +
    product.sizes.map((s, i) => '<button class="size-option ' + (i === 0 ? 'active' : '') + '" onclick="selectSize(this)">' + s + '</button>').join('') +
    '</div>' +
    '</div>' +
    '<div class="quantity-selector">' +
    '<label>Quantity</label>' +
    '<div class="qty-controls">' +
    '<button onclick="changeQty(-1)">−</button>' +
    '<input type="text" value="1" id="qtyInput" readonly>' +
    '<button onclick="changeQty(1)">+</button>' +
    '</div>' +
    '</div>' +
    '<div class="product-actions">' +
    '<button class="btn-add-cart" id="addCartBtn" onclick="addProductToCart(' + product.id + ')" ' + (product.stock === 0 ? 'disabled' : '') + '>' + (product.stock === 0 ? 'Out of Stock' : 'Add to Bag') + '</button>' +
    '<button class="btn-wishlist ' + (isWished ? 'active' : '') + '" id="wishlistBtn" onclick="toggleProductWishlist(' + product.id + ')">' + (isWished ? '&#10084;' : '&#9825;') + '</button>' +
    '</div>' +
    '<div class="product-meta">' +
    '<p><strong>Category:</strong> ' + product.category.replace('-', ' ').toUpperCase() + '</p>' +
    '<p><strong>Shipping:</strong> Free delivery on orders over PKR 5,000</p>' +
    '<p><strong>Returns:</strong> Easy 7-day exchange policy</p>' +
    '</div>';

  // Related products
  const relatedContainer = document.getElementById('relatedProducts');
  if (relatedContainer) {
    const related = products.filter(p => p.id !== product.id && (p.category === product.category || p.category.includes(product.category.split('-')[0]))).slice(0, 4);
    if (related.length > 0) {
      relatedContainer.innerHTML = '<h2>You May Also Like</h2><div class="product-grid">' + related.map(p => renderProductCard(p)).join('') + '</div>';
    }
  }

  // Breadcrumb product name
  const breadcrumb = document.getElementById('breadcrumbProduct');
  if (breadcrumb) breadcrumb.textContent = product.name;

  renderRecentlyViewed();
  updateCartBadge();
}

function setMainImage(src, thumb) {
  const mainImg = document.getElementById('mainImage');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.gallery-thumbs img').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function toggleAccordion(header) {
  const item = header.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

function selectSize(btn) {
  document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  input.value = val;
}

function addProductToCart(productId) {
  const activeSize = document.querySelector('.size-option.active');
  const size = activeSize ? activeSize.textContent : 'M';
  const qtyInput = document.getElementById('qtyInput');
  const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
  addToCart(productId, size, qty);
}

function toggleProductWishlist(productId) {
  toggleWishlist(productId);
  const btn = document.getElementById('wishlistBtn');
  if (btn) {
    const isWished = getWishlist().includes(productId);
    btn.classList.toggle('active', isWished);
    btn.innerHTML = isWished ? '&#10084;' : '&#9825;';
  }
}

function openSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) modal.classList.add('active');
}

function closeSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) modal.classList.remove('active');
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

  if (itemsContainer) itemsContainer.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    return '<div class="cart-item">' +
      '<img src="' + product.image + '" alt="' + product.name + '">' +
      '<div class="cart-item-details">' +
      '<h3>' + product.name + '</h3>' +
      '<div class="variant">Size: ' + item.size + '</div>' +
      '<div class="qty-controls" style="border:none;margin-bottom:10px;">' +
      '<button onclick="updateCartQty(' + item.id + ', '' + item.size + '', -1)">−</button>' +
      '<input type="text" value="' + item.qty + '" readonly style="width:40px;">' +
      '<button onclick="updateCartQty(' + item.id + ', '' + item.size + '', 1)">+</button>' +
      '</div>' +
      '<div class="cart-actions">' +
      '<button onclick="removeFromCart(' + item.id + ', '' + item.size + '')">Remove</button>' +
      '<button onclick="moveToWishlist(' + item.id + ', '' + item.size + '')">Move to Wishlist</button>' +
      '</div>' +
      '</div>' +
      '<div class="cart-item-price">PKR ' + (product.price * item.qty).toLocaleString() + '</div>' +
      '</div>';
  }).join('');

  const subtotal = getCartTotal();
  const discount = getDiscount();
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal - discount + shipping;
  const freeShipThreshold = 5000;
  const remaining = Math.max(0, freeShipThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShipThreshold) * 100);

  const couponHtml = getCoupon() ?
    '<div class="coupon-applied">Coupon &quot;' + getCoupon() + '&quot; applied — PKR ' + discount.toLocaleString() + ' saved</div>' :
    '<form class="coupon-form" onsubmit="applyCoupon(event)">' +
    '<input type="text" placeholder="Enter promo code" id="couponInput">' +
    '<button type="submit">Apply</button>' +
    '</form>';

  if (summaryContainer) summaryContainer.innerHTML =
    '<h2>Order Summary</h2>' +
    '<div class="shipping-bar">' +
    '<p>' + (remaining > 0 ? 'Add PKR ' + remaining.toLocaleString() + ' more for free shipping!' : 'You qualify for free shipping!') + '</p>' +
    '<div class="progress"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
    '</div>' +
    couponHtml +
    '<div class="summary-row"><span>Subtotal</span><span>PKR ' + subtotal.toLocaleString() + '</span></div>' +
    (discount > 0 ? '<div class="summary-row discount"><span>Discount</span><span>-PKR ' + discount.toLocaleString() + '</span></div>' : '') +
    '<div class="summary-row"><span>Shipping</span><span>' + (shipping === 0 ? 'Free' : 'PKR ' + shipping.toLocaleString()) + '</span></div>' +
    '<div class="summary-row total"><span>Total</span><span>PKR ' + total.toLocaleString() + '</span></div>' +
    '<button class="checkout-btn" onclick="location.href='checkout.html'">Proceed to Checkout</button>';

  updateCartBadge();
}

function applyCoupon(e) {
  e.preventDefault();
  const input = document.getElementById('couponInput');
  const code = input ? input.value.trim().toUpperCase() : '';
  if (code === 'WELCOME10') {
    saveCoupon('WELCOME10');
    showToast('Coupon applied! 10% off');
    initCart();
  } else {
    showToast('Invalid coupon code');
  }
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
  const discount = getDiscount();
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal - discount + shipping;

  container.innerHTML =
    '<h2 style="font-size:18px;letter-spacing:2px;text-transform:uppercase;margin-bottom:25px;font-weight:400;">Order Summary</h2>' +
    cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      return '<div class="order-item">' +
        '<img src="' + product.image + '" alt="' + product.name + '">' +
        '<div class="order-item-info">' +
        '<h4>' + product.name + '</h4>' +
        '<p>Qty: ' + item.qty + ' | Size: ' + item.size + '</p>' +
        '<p><strong>PKR ' + (product.price * item.qty).toLocaleString() + '</strong></p>' +
        '</div>' +
        '</div>';
    }).join('') +
    '<div class="summary-row" style="margin-top:20px;padding-top:20px;border-top:1px solid #eee;"><span>Subtotal</span><span>PKR ' + subtotal.toLocaleString() + '</span></div>' +
    (discount > 0 ? '<div class="summary-row discount"><span>Discount</span><span>-PKR ' + discount.toLocaleString() + '</span></div>' : '') +
    '<div class="summary-row"><span>Shipping</span><span>' + (shipping === 0 ? 'Free' : 'PKR ' + shipping.toLocaleString()) + '</span></div>' +
    '<div class="summary-row total" style="font-size:18px;font-weight:600;margin-top:15px;padding-top:15px;border-top:1px solid #ddd;"><span>Total</span><span>PKR ' + total.toLocaleString() + '</span></div>';

  // Payment method selection
  document.querySelectorAll('.payment-method').forEach(pm => {
    pm.addEventListener('click', function() {
      document.querySelectorAll('.payment-method').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      this.querySelector('input').checked = true;
      const cardFields = document.getElementById('cardFields');
      if (cardFields) cardFields.style.display = this.dataset.method === 'card' ? 'block' : 'none';
    });
  });

  // Shipping option selection
  document.querySelectorAll('.shipping-option').forEach(so => {
    so.addEventListener('click', function() {
      document.querySelectorAll('.shipping-option').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      this.querySelector('input').checked = true;
    });
  });
}

function placeOrder() {
  const cart = getCart();
  if (cart.length === 0) { showToast('Your cart is empty'); return; }
  const orderId = 'BAROQUE-' + Date.now().toString(36).toUpperCase();
  const orders = getOrders();
  orders.push({
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    items: cart,
    total: getCartTotal(),
    status: 'processing'
  });
  saveOrders(orders);
  localStorage.removeItem('baroqueCart');
  localStorage.removeItem('baroqueCoupon');
  updateCartBadge();
  location.href = 'order-success.html?order=' + orderId;
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
  setLoggedIn(true);
  showToast('Welcome back! You are now signed in.');
  setTimeout(() => location.href = 'account.html', 800);
}

function handleRegister(e) {
  e.preventDefault();
  setLoggedIn(true);
  showToast('Account created successfully! Welcome to Baroque.');
  setTimeout(() => location.href = 'account.html', 800);
}

function initAccount() {
  if (getLoggedIn()) {
    const container = document.querySelector('.account-container');
    if (container) container.style.display = 'none';
    const dashboard = document.getElementById('accountDashboard');
    if (dashboard) dashboard.classList.add('active');
    renderOrders();
  }
}

function renderOrders() {
  const tbody = document.getElementById('ordersTable');
  if (!tbody) return;
  const orders = getOrders();
  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#999;">No orders yet</td></tr>';
    return;
  }
  tbody.innerHTML = orders.map(o => {
    const product = products.find(p => p.id === o.items[0].id);
    return '<tr>' +
      '<td>' + o.id + '</td>' +
      '<td>' + o.date + '</td>' +
      '<td>' + (product ? product.name : 'Product') + (o.items.length > 1 ? ' + ' + (o.items.length - 1) + ' more' : '') + '</td>' +
      '<td><span class="order-status ' + o.status + '">' + o.status + '</span></td>' +
      '<td>PKR ' + o.total.toLocaleString() + '</td>' +
      '</tr>';
  }).join('');
}

function logout() {
  setLoggedIn(false);
  showToast('Logged out successfully');
  setTimeout(() => location.href = 'account.html', 800);
}

// ===================== WISHLIST =====================
function initWishlist() {
  const list = getWishlist();
  const grid = document.getElementById('wishlistGrid');
  const empty = document.getElementById('wishlistEmpty');
  if (!grid) return;

  if (list.length === 0) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  if (empty) empty.style.display = 'none';
  const wishProducts = list.map(id => products.find(p => p.id === id)).filter(Boolean);
  grid.innerHTML = wishProducts.map(p => renderProductCard(p)).join('');
  updateWishlistIcons();
}

// ===================== CONTACT =====================
function handleContact(e) {
  e.preventDefault();
  showToast('Message sent! We will get back to you soon.');
  e.target.reset();
}

// ===================== GLOBAL INIT =====================
window.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateWishlistIcons();

  // Popup
  if (!localStorage.getItem('popupClosed') && document.getElementById('popup')) {
    setTimeout(() => {
      const popup = document.getElementById('popup');
      if (popup) popup.classList.add('active');
    }, 2000);
  }

  // Header scroll
  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    handleScrollTop();
  });
  handleHeaderScroll();
  handleScrollTop();

  // Mobile menu close on link click
  document.querySelectorAll('.nav-center a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Search input listener
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => doSearch(e.target.value));
  }
});
