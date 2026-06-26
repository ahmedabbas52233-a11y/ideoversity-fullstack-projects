let current = '0', previous = '', op = null, reset = false, memoryVal = 0, sciMode = false;
const curEl = document.getElementById('current'), prevEl = document.getElementById('previous');
const historyList = document.getElementById('historyList'), historyPanel = document.getElementById('historyPanel');
let history = [];

function update() {
  curEl.textContent = current;
  prevEl.textContent = op ? `${previous} ${op}` : '';
}

function appendNumber(n) {
  if (reset) { current = ''; reset = false; }
  if (n === '.' && current.includes('.')) return;
  if (current === '0' && n !== '.') current = n; else current += n;
  update();
}

function chooseOperation(o) {
  if (current === '') return;
  if (previous !== '') calculate();
  op = o; previous = current; reset = true; update();
}

function calculate() {
  if (!op || previous === '') return;
  let comp, p = parseFloat(previous), c = parseFloat(current);
  if (isNaN(p) || isNaN(c)) return;
  switch(op) {
    case '+': comp = p + c; break;
    case '-': comp = p - c; break;
    case '×': comp = p * c; break;
    case '÷': if (c === 0) { alert('Cannot divide by zero'); return; } comp = p / c; break;
    case '%': comp = p % c; break;
    case '^': comp = Math.pow(p, c); break;
  }
  comp = parseFloat(comp.toFixed(10));
  addHistory(`${previous} ${op} ${current}`, comp);
  current = comp.toString(); op = null; previous = ''; reset = true; update();
}

function sciFunc(fn) {
  let val = parseFloat(current) || 0, res;
  switch(fn) {
    case 'sin': res = Math.sin(val * Math.PI / 180); break;
    case 'cos': res = Math.cos(val * Math.PI / 180); break;
    case 'tan': res = Math.tan(val * Math.PI / 180); break;
    case 'log': res = Math.log10(val); break;
    case 'sqrt': res = Math.sqrt(val); break;
  }
  res = parseFloat(res.toFixed(10));
  addHistory(`${fn}(${current})`, res);
  current = res.toString(); reset = true; update();
}

function addHistory(expr, res) {
  history.unshift({ expr, res });
  if (history.length > 20) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = history.map(h => `<div class="history-item" onclick="recall('${h.res}')">${h.expr} <span class="hist-res">= ${h.res}</span></div>`).join('');
}

function recall(val) { current = val.toString(); reset = true; update(); }
function clearHistory() { history = []; renderHistory(); }

function clearAll() { current = '0'; previous = ''; op = null; update(); }
function deleteLast() { current = current.length === 1 ? '0' : current.slice(0, -1); update(); }

function memory(cmd) {
  const val = parseFloat(current) || 0;
  if (cmd === 'M+') memoryVal += val;
  if (cmd === 'M-') memoryVal -= val;
  if (cmd === 'MC') memoryVal = 0;
  if (cmd === 'MR') { current = memoryVal.toString(); reset = true; update(); }
}

function toggleSci() {
  sciMode = !sciMode;
  document.querySelectorAll('.sci').forEach(b => b.classList.toggle('visible', sciMode));
  document.querySelector('.sci-toggle').style.color = sciMode ? 'var(--op)' : '#888';
}

function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('light')) { body.classList.remove('light'); body.classList.add('neon'); }
  else if (body.classList.contains('neon')) { body.classList.remove('neon'); }
  else { body.classList.add('light'); }
}

document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.') appendNumber('.');
  if (e.key === '+') chooseOperation('+');
  if (e.key === '-') chooseOperation('-');
  if (e.key === '*') chooseOperation('×');
  if (e.key === '/') chooseOperation('÷');
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === 'Escape') clearAll();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'h') historyPanel.classList.toggle('open');
});