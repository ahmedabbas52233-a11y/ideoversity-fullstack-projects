// State
let current = '0';
let previous = '';
let operation = null;
let shouldReset = false;
let memoryVal = 0;
let history = [];
let soundEnabled = true;
let angleMode = 'DEG'; // or 'RAD'
let currentTheme = 0;
const themes = ['', 'theme-pink', 'theme-green', 'theme-gold'];

// Audio Context for sound synthesis
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

// DOM Elements
const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');
const opIndicator = document.getElementById('opIndicator');
const memIndicator = document.getElementById('memIndicator');
const historyList = document.getElementById('historyList');
const historyPanel = document.getElementById('historyPanel');
const sciKeys = document.getElementById('sciKeys');
const progKeys = document.getElementById('progKeys');
const soundBtn = document.getElementById('soundBtn');
const angleBtn = document.getElementById('angleBtn');

// Create floating particles
function createParticles() {
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.animationDuration = (Math.random() * 5 + 8) + 's';
        document.body.appendChild(p);
    }
}
createParticles();

// Sound - using Web Audio API for reliable cross-browser support
function playSound() {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        // Resume context if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 1200;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
        // Audio not supported, silently fail
    }
}

// Ripple effect
function createRipple(e) {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Update display
function updateDisplay() {
    currentDisplay.textContent = current;
    previousDisplay.textContent = previous + (operation ? ' ' + operation : '');
    opIndicator.textContent = operation || '';
    opIndicator.classList.toggle('active', !!operation);
}

// Number input
function appendNumber(num) {
    playSound();
    if (shouldReset) {
        current = '';
        shouldReset = false;
    }
    if (num === '.' && current.includes('.')) return;
    if (current === '0' && num !== '.') {
        current = num;
    } else {
        current += num;
    }
    updateDisplay();
}

// Operation
function chooseOperation(op) {
    playSound();
    if (current === '') return;
    if (previous !== '') calculate();
    operation = op;
    previous = current;
    shouldReset = true;
    document.querySelectorAll('.operator').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    updateDisplay();
}

// Calculate
function calculate() {
    playSound();
    if (!operation || previous === '') return;

    let computation;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+': computation = prev + curr; break;
        case '-': computation = prev - curr; break;
        case '×': computation = prev * curr; break;
        case '÷':
            if (curr === 0) {
                showError('Cannot divide by zero');
                return;
            }
            computation = prev / curr;
            break;
        case '%': computation = prev % curr; break;
        case 'pow': computation = Math.pow(prev, curr); break;
        default: return;
    }

    // Fix floating point
    computation = parseFloat(computation.toFixed(10));

    addHistory(`${previous} ${operation} ${current}`, computation);

    current = computation.toString();
    previous = '';
    operation = null;
    shouldReset = true;

    document.querySelectorAll('.operator').forEach(b => b.classList.remove('active'));
    updateDisplay();
}

// Scientific functions
function sciFunc(fn) {
    playSound();
    const val = parseFloat(current) || 0;
    let result;
    const rad = angleMode === 'DEG' ? val * Math.PI / 180 : val;

    switch (fn) {
        case 'sin': result = Math.sin(rad); break;
        case 'cos': result = Math.cos(rad); break;
        case 'tan': result = Math.tan(rad); break;
        case 'asin': result = angleMode === 'DEG' ? Math.asin(val) * 180 / Math.PI : Math.asin(val); break;
        case 'acos': result = angleMode === 'DEG' ? Math.acos(val) * 180 / Math.PI : Math.acos(val); break;
        case 'atan': result = angleMode === 'DEG' ? Math.atan(val) * 180 / Math.PI : Math.atan(val); break;
        case 'log': result = Math.log10(val); break;
        case 'ln': result = Math.log(val); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'cbrt': result = Math.cbrt(val); break;
        case 'pow': chooseOperation('pow'); return;
        case 'fact': result = factorial(Math.floor(val)); break;
        case 'pi': result = Math.PI; break;
        case 'e': result = Math.E; break;
        case 'abs': result = Math.abs(val); break;
        case 'inv': result = 1 / val; break;
        default: return;
    }

    result = parseFloat(result.toFixed(10));
    addHistory(`${fn}(${current})`, result);
    current = result.toString();
    shouldReset = true;
    updateDisplay();
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

// Programmer functions
function progFunc(fn) {
    playSound();
    const val = parseInt(current) || 0;

    switch (fn) {
        case 'bin': current = val.toString(2); break;
        case 'oct': current = val.toString(8); break;
        case 'hex': current = val.toString(16).toUpperCase(); break;
        case 'dec': current = val.toString(10); break;
        case 'and': chooseOperation('and'); return;
        case 'or': chooseOperation('or'); return;
        case 'xor': chooseOperation('xor'); return;
        case 'not': current = (~val).toString(); break;
        case 'shl': current = (val << 1).toString(); break;
        case 'shr': current = (val >> 1).toString(); break;
        case 'mod': chooseOperation('%'); return;
    }

    shouldReset = true;
    updateDisplay();
}

// Memory
function memory(cmd) {
    playSound();
    const val = parseFloat(current) || 0;
    switch (cmd) {
        case 'MC': memoryVal = 0; break;
        case 'MR': current = memoryVal.toString(); shouldReset = true; break;
        case 'M+': memoryVal += val; break;
        case 'M-': memoryVal -= val; break;
    }
    memIndicator.classList.toggle('active', memoryVal !== 0);
    updateDisplay();
}

// Utilities
function clearAll() {
    playSound();
    current = '0';
    previous = '';
    operation = null;
    shouldReset = false;
    document.querySelectorAll('.operator').forEach(b => b.classList.remove('active'));
    updateDisplay();
}

function deleteLast() {
    playSound();
    if (current.length === 1) {
        current = '0';
    } else {
        current = current.slice(0, -1);
    }
    updateDisplay();
}

function toggleSign() {
    playSound();
    if (current !== '0') {
        current = current.startsWith('-') ? current.slice(1) : '-' + current;
    }
    updateDisplay();
}

function showError(msg) {
    currentDisplay.textContent = msg;
    currentDisplay.classList.add('error');
    setTimeout(() => {
        currentDisplay.classList.remove('error');
        current = '0';
        updateDisplay();
    }, 1500);
}

// History
function addHistory(expr, result) {
    history.unshift({ expr, result });
    if (history.length > 50) history.pop();
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-history">No calculations yet</div>';
        return;
    }
    historyList.innerHTML = history.map((h, i) => `
        <div class="history-item" onclick="recallHistory(${i})">
            <div class="history-expr">${h.expr}</div>
            <div class="history-result">= ${formatNumber(h.result)}</div>
        </div>
    `).join('');
}

function recallHistory(index) {
    playSound();
    current = history[index].result.toString();
    shouldReset = true;
    updateDisplay();
}

function clearHistory() {
    playSound();
    history = [];
    renderHistory();
}

function formatNumber(num) {
    if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
        return num.toExponential(6);
    }
    return parseFloat(num.toFixed(10)).toString();
}

// Modes
function setMode(mode) {
    playSound();
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    sciKeys.classList.remove('show');
    progKeys.classList.remove('show');

    if (mode === 'scientific') {
        sciKeys.classList.add('show');
    } else if (mode === 'programmer') {
        progKeys.classList.add('show');
    }
}

// Theme - FIXED: proper class cycling on body
function cycleTheme() {
    playSound();
    const body = document.body;

    // Remove current theme class
    if (themes[currentTheme]) {
        body.classList.remove(themes[currentTheme]);
    }

    // Move to next theme
    currentTheme = (currentTheme + 1) % themes.length;

    // Add new theme class if not default
    if (themes[currentTheme]) {
        body.classList.add(themes[currentTheme]);
    }

    // Update button text to show current theme
    const themeNames = ['Cyan', 'Pink', 'Green', 'Gold'];
    event.target.textContent = '◐ ' + themeNames[currentTheme];
}

// Sound toggle
function toggleSound() {
    soundEnabled = !soundEnabled;
    soundBtn.classList.toggle('muted', !soundEnabled);
    soundBtn.textContent = soundEnabled ? '🔊 Sound' : '🔇 Sound';
}

// History panel toggle
function toggleHistory() {
    playSound();
    historyPanel.classList.toggle('open');
}

// Angle toggle
function toggleAngle() {
    playSound();
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    angleBtn.textContent = angleMode;
}

// Keyboard support
function findButtonByText(text) {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
        if (btn.textContent.trim() === text) return btn;
    }
    return null;
}

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9') { playSound(); appendNumber(key); }
    else if (key === '.') { playSound(); appendNumber('.'); }
    else if (key === '+') { playSound(); chooseOperation('+'); }
    else if (key === '-') { playSound(); chooseOperation('-'); }
    else if (key === '*') { playSound(); e.preventDefault(); chooseOperation('×'); }
    else if (key === '/') { playSound(); e.preventDefault(); chooseOperation('÷'); }
    else if (key === '%') { playSound(); chooseOperation('%'); }
    else if (key === 'Enter' || key === '=') { playSound(); calculate(); }
    else if (key === 'Escape') { playSound(); clearAll(); }
    else if (key === 'Backspace') { playSound(); deleteLast(); }
});

// Initialize
updateDisplay();
