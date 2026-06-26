const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Counter animation
const counters = document.querySelectorAll('.stat-num');
const speed = 200;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const updateCount = () => {
        const count = +entry.target.innerText;
        const inc = target / speed;
        if (count < target) { entry.target.innerText = Math.ceil(count + inc); setTimeout(updateCount, 20); }
        else { entry.target.innerText = target.toLocaleString(); }
      };
      updateCount();
      counterObserver.unobserve(entry.target);
    }
  });
});
counters.forEach(c => counterObserver.observe(c));

// Testimonial slider
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

setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

function subscribe(e) {
  e.preventDefault();
  alert('Thanks for subscribing!');
  e.target.reset();
}