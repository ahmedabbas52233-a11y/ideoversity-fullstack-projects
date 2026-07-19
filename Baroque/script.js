/* ============================================
   BAROQUE.PK — Complete Debugged JavaScript
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // DOM READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

    function initApp() {
        initMobileMenu();
        initSearchOverlay();
        initScrollTop();
        initAccountTabs();
        initAuthTabs();
        initCart();
        initWishlist();
        initProductPage();
        initCheckout();
        initContactForm();
        initAnimations();
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    function initMobileMenu() {
        var toggle = document.querySelector('.header-mobile-toggle');
        var menu = document.querySelector('.mobile-menu');
        if (!toggle || !menu) return;

        var spans = toggle.querySelectorAll('span');
        var isOpen = false;

        toggle.addEventListener('click', function() {
            isOpen = !isOpen;
            menu.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';

            if (spans.length >= 3) {
                if (isOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            }
        });

        var links = menu.querySelectorAll('.mobile-menu-link');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                isOpen = false;
                menu.classList.remove('active');
                document.body.style.overflow = '';
                if (spans.length >= 3) {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            });
        }
    }

    // ============================================
    // SEARCH OVERLAY
    // ============================================
    function initSearchOverlay() {
        var toggle = document.querySelector('.search-toggle');
        var overlay = document.querySelector('.search-overlay');
        var closeBtn = document.querySelector('.search-overlay-close');
        var input = document.querySelector('.search-overlay-input');
        var results = document.querySelector('.search-overlay-results');

        if (!toggle || !overlay) return;

        function openOverlay() {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (input) {
                setTimeout(function() { input.focus(); }, 100);
            }
        }

        function closeOverlay() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            if (input) input.value = '';
            if (results) results.innerHTML = '';
        }

        toggle.addEventListener('click', openOverlay);
        if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeOverlay();
            }
        });

        if (input && results) {
            var debounceTimer;
            input.addEventListener('input', function(e) {
                clearTimeout(debounceTimer);
                var query = e.target.value.trim();
                if (query.length < 2) {
                    results.innerHTML = '';
                    return;
                }
                debounceTimer = setTimeout(function() {
                    performSearch(query, results);
                }, 300);
            });
        }
    }

    function performSearch(query, container) {
        var products = [
            { name: 'Chantelle Embroidered Shirt', price: 'PKR 12,500', category: 'Shirts' },
            { name: 'Velvet Eid Collection', price: 'PKR 18,900', category: 'Eid Collection' },
            { name: 'Silk Chiffon Dupatta', price: 'PKR 4,500', category: 'Accessories' },
            { name: 'Baroque Formal Dress', price: 'PKR 25,000', category: 'Dresses' },
            { name: 'Cotton Lawn Suit', price: 'PKR 8,900', category: 'Suits' },
            { name: 'Embellished Kurta', price: 'PKR 15,500', category: 'Kurtas' },
            { name: 'Printed Scarf', price: 'PKR 2,900', category: 'Accessories' },
            { name: 'Linen Trouser', price: 'PKR 5,500', category: 'Bottoms' }
        ];

        var filtered = products.filter(function(p) {
            return p.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                   p.category.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">No products found.</p>';
            return;
        }

        var html = '';
        for (var i = 0; i < filtered.length; i++) {
            var p = filtered[i];
            html += '<a href="product.html" class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">' +
                '<div class="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>' +
                '<div>' +
                    '<p class="font-medium text-sm">' + escapeHtml(p.name) + '</p>' +
                    '<p class="text-xs text-gray-500">' + escapeHtml(p.category) + ' &bull; ' + escapeHtml(p.price) + '</p>' +
                '</div>' +
            '</a>';
        }
        container.innerHTML = html;
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // SCROLL TO TOP
    // ============================================
    function initScrollTop() {
        var btn = document.querySelector('.scroll-top');
        if (!btn) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // ACCOUNT TABS
    // ============================================
    function initAccountTabs() {
        var navLinks = document.querySelectorAll('.account-nav-link[data-tab]');
        var panels = document.querySelectorAll('.account-tab-panel');

        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function(e) {
                e.preventDefault();
                var tab = this.dataset.tab;

                for (var j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove('active');
                }
                this.classList.add('active');

                for (var k = 0; k < panels.length; k++) {
                    panels[k].classList.add('hidden');
                }
                var target = document.getElementById('tab-' + tab);
                if (target) target.classList.remove('hidden');
            });
        }
    }

    // ============================================
    // AUTH TABS (LOGIN/REGISTER)
    // ============================================
    function initAuthTabs() {
        var tabs = document.querySelectorAll('.auth-tab');
        var loginForm = document.getElementById('login-form');
        var registerForm = document.getElementById('register-form');

        if (!tabs.length) return;

        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function() {
                for (var j = 0; j < tabs.length; j++) {
                    tabs[j].classList.remove('active');
                }
                this.classList.add('active');

                var target = this.dataset.tab;
                if (target === 'login') {
                    if (loginForm) loginForm.classList.remove('hidden');
                    if (registerForm) registerForm.classList.add('hidden');
                } else {
                    if (loginForm) loginForm.classList.add('hidden');
                    if (registerForm) registerForm.classList.remove('hidden');
                }
            });
        }
    }

    // ============================================
    // CART FUNCTIONALITY
    // ============================================
    function initCart() {
        var cart = [];
        try {
            var stored = localStorage.getItem('baroque_cart');
            if (stored) cart = JSON.parse(stored);
        } catch (e) {
            cart = [];
        }
        updateCartBadge(cart.length);

        var buttons = document.querySelectorAll('.add-to-cart');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                var product = {
                    id: this.dataset.id || Date.now().toString(),
                    name: this.dataset.name || 'Product',
                    price: this.dataset.price || '0',
                    qty: 1
                };
                cart.push(product);
                try {
                    localStorage.setItem('baroque_cart', JSON.stringify(cart));
                } catch (e) {}
                updateCartBadge(cart.length);
                showToast('Added to cart');
            });
        }
    }

    function updateCartBadge(count) {
        var badges = document.querySelectorAll('.cart-badge');
        for (var i = 0; i < badges.length; i++) {
            badges[i].textContent = count;
            badges[i].classList.toggle('hidden', count === 0);
        }
    }

    // ============================================
    // WISHLIST FUNCTIONALITY
    // ============================================
    function initWishlist() {
        var wishlist = [];
        try {
            var stored = localStorage.getItem('baroque_wishlist');
            if (stored) wishlist = JSON.parse(stored);
        } catch (e) {
            wishlist = [];
        }
        updateWishlistBadge(wishlist.length);

        var buttons = document.querySelectorAll('.add-to-wishlist');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                var productId = this.dataset.id;
                var index = wishlist.indexOf(productId);
                if (index === -1) {
                    wishlist.push(productId);
                    showToast('Added to wishlist');
                } else {
                    wishlist.splice(index, 1);
                    showToast('Removed from wishlist');
                }
                try {
                    localStorage.setItem('baroque_wishlist', JSON.stringify(wishlist));
                } catch (e) {}
                updateWishlistBadge(wishlist.length);
            });
        }

        var wishlistGrid = document.querySelector('.wishlist-grid');
        var wishlistEmpty = document.querySelector('.wishlist-empty');
        if (wishlistGrid && wishlistEmpty) {
            if (wishlist.length > 0) {
                wishlistEmpty.classList.add('hidden');
                wishlistGrid.classList.remove('hidden');
                wishlistGrid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">Wishlist items would render here with real product data.</p>';
            }
        }
    }

    function updateWishlistBadge(count) {
        var badges = document.querySelectorAll('.wishlist-badge');
        for (var i = 0; i < badges.length; i++) {
            badges[i].textContent = count;
            badges[i].classList.toggle('hidden', count === 0);
        }
    }

    // ============================================
    // PRODUCT PAGE
    // ============================================
    function initProductPage() {
        var qtyBtns = document.querySelectorAll('.qty-btn');
        for (var i = 0; i < qtyBtns.length; i++) {
            qtyBtns[i].addEventListener('click', function() {
                var wrapper = this.parentElement;
                var input = wrapper.querySelector('.qty-input');
                if (!input) return;
                var val = parseInt(input.value) || 1;
                if (this.dataset.action === 'inc') {
                    val++;
                } else if (this.dataset.action === 'dec' && val > 1) {
                    val--;
                }
                input.value = val;
            });
        }

        var thumbs = document.querySelectorAll('.gallery-thumb');
        for (var j = 0; j < thumbs.length; j++) {
            thumbs[j].addEventListener('click', function() {
                var mainImg = document.querySelector('.gallery-main img');
                if (mainImg) mainImg.src = this.dataset.src || this.src;
                for (var k = 0; k < thumbs.length; k++) {
                    thumbs[k].classList.remove('active');
                }
                this.classList.add('active');
            });
        }

        var sizeOpts = document.querySelectorAll('.size-option');
        for (var s = 0; s < sizeOpts.length; s++) {
            sizeOpts[s].addEventListener('click', function() {
                for (var t = 0; t < sizeOpts.length; t++) {
                    sizeOpts[t].classList.remove('active');
                }
                this.classList.add('active');
            });
        }

        var colorOpts = document.querySelectorAll('.color-option');
        for (var c = 0; c < colorOpts.length; c++) {
            colorOpts[c].addEventListener('click', function() {
                for (var d = 0; d < colorOpts.length; d++) {
                    colorOpts[d].classList.remove('active');
                }
                this.classList.add('active');
            });
        }
    }

    // ============================================
    // CHECKOUT
    // ============================================
    function initCheckout() {
        var form = document.querySelector('.checkout-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.textContent = 'Processing...';
                btn.disabled = true;
            }
            setTimeout(function() {
                try {
                    localStorage.removeItem('baroque_cart');
                } catch (e) {}
                updateCartBadge(0);
                window.location.href = 'order-success.html';
            }, 800);
        });

        var paymentRadios = document.querySelectorAll('input[name="payment"]');
        for (var i = 0; i < paymentRadios.length; i++) {
            paymentRadios[i].addEventListener('change', function() {
                var details = document.querySelectorAll('.payment-details');
                for (var j = 0; j < details.length; j++) {
                    details[j].classList.add('hidden');
                }
                var target = document.getElementById(this.value + '-details');
                if (target) target.classList.remove('hidden');
            });
        }
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    function initContactForm() {
        var form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            if (!btn) return;

            var originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(function() {
                btn.textContent = 'Message Sent!';
                btn.style.background = 'var(--color-success)';
                form.reset();
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function initAnimations() {
        if (!('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add('animate-in');
                    observer.unobserve(entries[i].target);
                }
            }
        }, { threshold: 0.1 });

        var animatedElements = document.querySelectorAll('.value-card, .about-stat, .contact-method');
        for (var i = 0; i < animatedElements.length; i++) {
            animatedElements[i].style.opacity = '0';
            animatedElements[i].style.transform = 'translateY(20px)';
            animatedElements[i].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(animatedElements[i]);
        }
    }

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    function showToast(message) {
        var existing = document.querySelector('.baroque-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'baroque-toast';
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(100px);background:#1a1a1a;color:#fff;padding:0.875rem 1.5rem;border-radius:8px;font-size:0.875rem;font-weight:500;z-index:300;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);transition:transform 0.3s ease;';
        document.body.appendChild(toast);

        requestAnimationFrame(function() {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(function() {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(function() {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 2500);
    }
})();