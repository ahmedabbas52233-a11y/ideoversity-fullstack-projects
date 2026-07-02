// Image Zoom with viewport overflow protection
const zoomContainer = document.getElementById('zoomContainer');
const zoomLens = document.getElementById('zoomLens');
const zoomResult = document.getElementById('zoomResult');
const mainImage = document.getElementById('mainImage');

zoomContainer.addEventListener('mouseenter', function () {
  zoomLens.style.display = 'block';
  zoomResult.style.display = 'block';

  // Prevent zoom result from going off-screen
  const rect = zoomContainer.getBoundingClientRect();
  const spaceRight = window.innerWidth - rect.right;
  if (spaceRight < 420 || window.innerWidth < 1200) {
    zoomResult.style.left = 'auto';
    zoomResult.style.right = '102%';
  } else {
    zoomResult.style.left = '102%';
    zoomResult.style.right = 'auto';
  }
});

zoomContainer.addEventListener('mouseleave', function () {
  zoomLens.style.display = 'none';
  zoomResult.style.display = 'none';
});

zoomContainer.addEventListener('mousemove', function (e) {
  const rect = zoomContainer.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  const lensW = zoomLens.offsetWidth;
  const lensH = zoomLens.offsetHeight;

  x = x - lensW / 2;
  y = y - lensH / 2;

  if (x > rect.width - lensW) x = rect.width - lensW;
  if (x < 0) x = 0;
  if (y > rect.height - lensH) y = rect.height - lensH;
  if (y < 0) y = 0;

  zoomLens.style.left = x + 'px';
  zoomLens.style.top = y + 'px';

  const cx = zoomResult.offsetWidth / lensW;
  const cy = zoomResult.offsetHeight / lensH;

  zoomResult.style.backgroundImage = "url('" + mainImage.src + "')";
  zoomResult.style.backgroundSize =
    rect.width * cx + 'px ' + rect.height * cy + 'px';
  zoomResult.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
});

// Thumbnail switching
function changeImage(thumb, src) {
  document
    .querySelectorAll('.thumb')
    .forEach((t) => t.classList.remove('active'));
  thumb.classList.add('active');
  mainImage.src = src;
}

// Quantity controls
function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  let val = parseInt(input.value) || 1;
  val += delta;
  if (val < 1) val = 1;
  input.value = val;
}

// Size selection
document.querySelectorAll('.size-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    document
      .querySelectorAll('.size-btn')
      .forEach((b) => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Accordion
function toggleAccordion(header) {
  const item = header.parentElement;
  item.classList.toggle('active');
}

// Add to Cart feedback
function addToCart() {
  const btn = document.querySelector('.btn-cart');
  const originalText = btn.textContent;
  btn.textContent = 'Added to Cart!';
  btn.style.background = '#2e7d32';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '#000';
  }, 2000);
}

// Share buttons
function shareAlert(platform) {
  alert('Share on ' + platform + ' (demo link)');
}

// Newsletter
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input.value.includes('@')) {
    alert('Thank you for subscribing with ' + input.value);
    input.value = '';
  } else {
    alert('Please enter a valid email address.');
  }
}
