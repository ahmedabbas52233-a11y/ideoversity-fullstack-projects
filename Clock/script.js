const themes = [
  { primary: '#00f0ff', secondary: '#ff00a0', name: 'Cyberpunk' },
  { primary: '#00ff88', secondary: '#ffaa00', name: 'Matrix' },
  { primary: '#ff3366', secondary: '#ffcc00', name: 'Sunset' },
  { primary: '#a855f7', secondary: '#3b82f6', name: 'Nebula' },
  { primary: '#f8fafc', secondary: '#94a3b8', name: 'Monolith' },
];
let currentTheme = 0;

function cycleTheme() {
  currentTheme = (currentTheme + 1) % themes.length;
  const t = themes[currentTheme];
  document.documentElement.style.setProperty('--primary', t.primary);
  document.documentElement.style.setProperty('--secondary', t.secondary);
  document.getElementById('themeBtn').textContent = t.name;
}

// ===== CANVAS BACKGROUND =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height)
      this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawGrid() {
  const gridSize = 50;
  const time = Date.now() * 0.0005;
  const offsetX = Math.sin(time) * 20;
  const offsetY = Math.cos(time * 0.7) * 20;

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
  ctx.lineWidth = 1;

  for (let x = offsetX % gridSize; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = offsetY % gridSize; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawConnections() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, width, height);
  drawGrid();
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ===== CLOCK SETUP =====
const analog = document.getElementById('analog');
const center = 150;

for (let i = 0; i < 60; i++) {
  const tick = document.createElement('div');
  tick.className = i % 5 === 0 ? 'tick major' : 'tick minor';
  const angle = (i * 6 - 90) * (Math.PI / 180);
  const dist = 140;
  const x = center + dist * Math.cos(angle);
  const y = center + dist * Math.sin(angle);
  tick.style.left = x + 'px';
  tick.style.top = y + 'px';
  tick.style.transform = `rotate(${i * 6}deg)`;
  if (i % 5 === 0) {
    tick.style.transformOrigin = 'center 7px';
  } else {
    tick.style.transformOrigin = 'center 3px';
  }
  analog.appendChild(tick);
}

for (let i = 1; i <= 12; i++) {
  const num = document.createElement('div');
  num.className = 'number';
  num.textContent = i;
  const angle = (i * 30 - 90) * (Math.PI / 180);
  const dist = 110;
  const x = center + dist * Math.cos(angle);
  const y = center + dist * Math.sin(angle);
  num.style.left = x + 'px';
  num.style.top = y + 'px';
  analog.appendChild(num);
}

// ===== CLOCK UPDATE =====
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  const hourDeg = (h % 12) * 30 + m * 0.5 + s * (0.5 / 60);
  const minuteDeg = m * 6 + s * 0.1 + ms * 0.0001;
  const secondDeg = s * 6 + ms * 0.006;

  document.getElementById('hourHand').style.transform =
    'rotate(' + hourDeg + 'deg)';
  document.getElementById('minuteHand').style.transform =
    'rotate(' + minuteDeg + 'deg)';
  document.getElementById('secondHand').style.transform =
    'rotate(' + secondDeg + 'deg)';

  document.getElementById('dHour').textContent = String(h).padStart(2, '0');
  document.getElementById('dMinute').textContent = String(m).padStart(2, '0');
  document.getElementById('dSecond').textContent = String(s).padStart(2, '0');

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  document.getElementById('date').textContent =
    days[now.getDay()] +
    ' // ' +
    months[now.getMonth()] +
    ' ' +
    now.getDate() +
    ', ' +
    now.getFullYear();

  const dayProgress = ((h * 3600 + m * 60 + s) / 86400) * 100;
  const monthDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  const monthProgress = (now.getDate() / monthDays) * 100;
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
  const yearProgress = ((now - yearStart) / (yearEnd - yearStart)) * 100;

  document.getElementById('dayBar').style.width = dayProgress + '%';
  document.getElementById('dayPct').textContent = Math.round(dayProgress) + '%';
  document.getElementById('monthBar').style.width = monthProgress + '%';
  document.getElementById('monthPct').textContent =
    Math.round(monthProgress) + '%';
  document.getElementById('yearBar').style.width = yearProgress + '%';
  document.getElementById('yearPct').textContent =
    Math.round(yearProgress) + '%';

  requestAnimationFrame(updateClock);
}
updateClock();

// ===== PARALLAX =====
const container = document.getElementById('mainContainer');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  container.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
});

// Glitch effect
setInterval(() => {
  if (Math.random() > 0.85) {
    const el = document.getElementById('digital');
    el.style.textShadow = '2px 0 var(--secondary), -2px 0 var(--primary)';
    setTimeout(() => {
      el.style.textShadow = '';
    }, 100);
  }
}, 2000);
