// ===== Scroll Reveal Animation =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
}

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('.nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      document.getElementById('navLinks').classList.remove('open');
      // Update active state
      document
        .querySelectorAll('.nav a')
        .forEach((link) => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-num');
const speed = 200;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(easeOutQuart * target);

          entry.target.innerText = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            entry.target.innerText = target.toLocaleString();
          }
        };

        requestAnimationFrame(updateCount);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((c) => counterObserver.observe(c));

// ===== Testimonial Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 5000);

// Pause on hover
const slider = document.querySelector('.testimonial-slider');
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
  });
}

// ===== Newsletter Subscription =====
function subscribe(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.subscribe-btn');
  const originalText = btn.innerText;

  btn.innerText = 'Subscribing...';
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert(
      'Thank you for subscribing! You will receive our latest updates at your email.'
    );
    e.target.reset();
    btn.innerText = originalText;
    btn.disabled = false;
  }, 800);
}

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
