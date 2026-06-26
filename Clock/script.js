const analog = document.getElementById('analog');
for (let i = 1; i <= 12; i++) {
    const num = document.createElement('div');
    num.className = 'number';
    num.textContent = i;
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = 150 + 120 * Math.cos(angle) - 15;
    const y = 150 + 120 * Math.sin(angle) - 15;
    num.style.left = x + 'px';
    num.style.top = y + 'px';
    analog.appendChild(num);
}

function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();

    const hourDeg = (h % 12) * 30 + m * 0.5;
    const minuteDeg = m * 6 + s * 0.1;
    const secondDeg = s * 6 + ms * 0.006;

    document.getElementById('hourHand').style.transform = 'rotate(' + hourDeg + 'deg)';
    document.getElementById('minuteHand').style.transform = 'rotate(' + minuteDeg + 'deg)';
    document.getElementById('secondHand').style.transform = 'rotate(' + secondDeg + 'deg)';

    document.getElementById('dHour').textContent = String(h).padStart(2, '0');
    document.getElementById('dMinute').textContent = String(m).padStart(2, '0');
    document.getElementById('dSecond').textContent = String(s).padStart(2, '0');

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('date').textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
}

setInterval(updateClock, 50);
updateClock();