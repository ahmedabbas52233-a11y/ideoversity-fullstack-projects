const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll('.stat-num');
const speed = 200;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const update = () => {
        const c = +entry.target.innerText;
        const inc = target / speed;
        if (c < target) { entry.target.innerText = Math.ceil(c + inc); setTimeout(update, 20); }
        else { entry.target.innerText = target.toLocaleString(); }
      };
      update();
      counterObserver.unobserve(entry.target);
    }
  });
});
counters.forEach(c => counterObserver.observe(c));

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('successMsg').classList.add('visible');
  e.target.reset();
  setTimeout(() => document.getElementById('successMsg').classList.remove('visible'), 5000);
}