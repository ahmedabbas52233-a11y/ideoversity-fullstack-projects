// ===== AUDIO ENGINE (Web Audio API) =====
class AudioEngine {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.enabled = true;
  }
  
  playTone(freq, type, duration) {
    if (!this.enabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
  
  playMove() { 
    this.playTone(440, 'sine', 0.08); 
    setTimeout(() => this.playTone(660, 'sine', 0.12), 50); 
  }
  
  playWin() { 
    [523, 659, 784, 1047].forEach((f, i) => 
      setTimeout(() => this.playTone(f, 'square', 0.15), i * 80)
    ); 
  }
  
  playDraw() { this.playTone(200, 'sawtooth', 0.3); }
}

// ===== 3D PARTICLE BACKGROUND =====
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.initParticles();
    this.bindEvents();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }
  
  initParticles() {
    const count = Math.min(120, (this.canvas.width * this.canvas.height) / 10000);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * this.canvas.width * 2,
        y: (Math.random() - 0.5) * this.canvas.height * 2,
        z: Math.random() * 2000,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: -1.5 - Math.random() * 2.5
      });
    }
  }
  
  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    this.mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX - this.centerX) * 2;
      this.mouse.y = (e.clientY - this.centerY) * 2;
    });
  }
  
  animate() {
    this.ctx.fillStyle = 'rgba(10, 10, 15, 0.25)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    const time = Date.now() / 50;
    
    this.particles.forEach((p, i) => {
      p.z += p.vz;
      p.x += p.vx;
      p.y += p.vy;
      
      // Mouse repulsion
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 400 && dist > 0) {
        const force = (400 - dist) / 400;
        p.x += (dx / dist) * force * 3;
        p.y += (dy / dist) * force * 3;
      }
      
      if (p.z <= 0) {
        p.z = 2000;
        p.x = (Math.random() - 0.5) * this.canvas.width * 2;
        p.y = (Math.random() - 0.5) * this.canvas.height * 2;
      }
      
      const scale = 1000 / (1000 + p.z);
      const x2d = this.centerX + p.x * scale;
      const y2d = this.centerY + p.y * scale;
      const size = 2.5 * scale;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${(time + i * 3) % 360}, 80%, 60%, ${scale * 0.8})`;
      this.ctx.fill();
      
      // Connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const scale2 = 1000 / (1000 + p2.z);
        const x2 = this.centerX + p2.x * scale2;
        const y2 = this.centerY + p2.y * scale2;
        const d = Math.hypot(x2d - x2, y2d - y2);
        if (d < 120 && Math.abs(p.z - p2.z) < 300) {
          this.ctx.beginPath();
          this.ctx.moveTo(x2d, y2d);
          this.ctx.lineTo(x2, y2);
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * scale * scale2})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ===== AI ENGINE (Minimax Algorithm) =====
class AIEngine {
  constructor() {
    this.winningConditions = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
  }
  
  getBestMove(board, player) {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = player;
        const score = this.minimax(board, 0, false, player);
        board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }
  
  minimax(board, depth, isMaximizing, aiPlayer) {
    const human = aiPlayer === 'X' ? 'O' : 'X';
    const result = this.checkWinner(board);
    if (result === aiPlayer) return 10 - depth;
    if (result === human) return depth - 10;
    if (result === 'draw') return 0;
    
    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = aiPlayer;
          best = Math.max(best, this.minimax(board, depth + 1, false, aiPlayer));
          board[i] = '';
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = human;
          best = Math.min(best, this.minimax(board, depth + 1, true, aiPlayer));
          board[i] = '';
        }
      }
      return best;
    }
  }
  
  checkWinner(board) {
    for (const [a,b,c] of this.winningConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    if (board.every(c => c !== '')) return 'draw';
    return null;
  }
}

// ===== GAME ENGINE =====
class GameEngine {
  constructor() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.scores = { X: 0, O: 0, draw: 0 };
    this.vsAI = true;
    this.ai = new AIEngine();
    this.audio = new AudioEngine();
    this.winningConditions = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    this.init();
  }
  
  init() {
    this.cacheDOM();
    this.bindEvents();
    this.updateStatus();
    this.loadScores();
  }
  
  cacheDOM() {
    this.cells = document.querySelectorAll('.cell');
    this.statusEl = document.getElementById('status');
    this.scoreX = document.getElementById('scoreX');
    this.scoreO = document.getElementById('scoreO');
    this.scoreDraw = document.getElementById('scoreDraw');
    this.boardEl = document.getElementById('board');
    this.modeToggle = document.getElementById('modeToggle');
  }
  
  bindEvents() {
    this.cells.forEach((cell, i) => {
      cell.addEventListener('click', () => this.makeMove(i));
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.makeMove(i);
        }
      });
    });
    
    document.getElementById('resetGame').addEventListener('click', () => this.resetGame());
    document.getElementById('resetScores').addEventListener('click', () => this.resetScores());
    
    this.modeToggle.addEventListener('change', (e) => {
      this.vsAI = e.target.checked;
      this.resetGame();
    });
    
    // 3D tilt effect
    document.addEventListener('mousemove', (e) => {
      const rect = this.boardEl.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) / 25;
      const y = (e.clientY - rect.top - rect.height/2) / 25;
      this.boardEl.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
  }
  
  makeMove(index) {
    if (!this.gameActive || this.board[index] !== '') return;
    
    if (this.audio.ctx.state === 'suspended') this.audio.ctx.resume();
    this.audio.playMove();
    
    this.board[index] = this.currentPlayer;
    this.renderCell(index);
    
    if (this.checkWin()) {
      this.endGame(false);
    } else if (this.board.every(c => c !== '')) {
      this.endGame(true);
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.updateStatus();
      
      if (this.vsAI && this.currentPlayer === 'O' && this.gameActive) {
        this.cells.forEach(c => c.style.pointerEvents = 'none');
        setTimeout(() => {
          const move = this.ai.getBestMove([...this.board], 'O');
          this.cells.forEach(c => c.style.pointerEvents = '');
          if (move !== -1) this.makeMove(move);
        }, 500);
      }
    }
  }
  
  renderCell(index) {
    const cell = this.cells[index];
    cell.textContent = this.currentPlayer;
    cell.classList.add(this.currentPlayer.toLowerCase());
    cell.setAttribute('aria-label', `Cell ${index + 1}, ${this.currentPlayer}`);
    
    cell.animate([
      { transform: 'scale(0.3) rotate(-45deg)', opacity: 0 },
      { transform: 'scale(1.2) rotate(5deg)', opacity: 1 },
      { transform: 'scale(1) rotate(0deg)', opacity: 1 }
    ], { duration: 350, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' });
  }
  
  checkWin() {
    for (const condition of this.winningConditions) {
      const [a, b, c] = condition;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.highlightWin(condition);
        return true;
      }
    }
    return false;
  }
  
  highlightWin(cells) {
    cells.forEach(index => this.cells[index].classList.add('winner'));
    this.drawWinningLine(cells);
  }
  
  drawWinningLine(cells) {
    const first = this.cells[cells[0]].getBoundingClientRect();
    const last = this.cells[cells[2]].getBoundingClientRect();
    const boardRect = this.boardEl.getBoundingClientRect();
    
    const x1 = first.left + first.width/2 - boardRect.left;
    const y1 = first.top + first.height/2 - boardRect.top;
    const x2 = last.left + last.width/2 - boardRect.left;
    const y2 = last.top + last.height/2 - boardRect.top;
    
    const line = document.createElement('div');
    line.className = 'win-line';
    const length = Math.hypot(x2-x1, y2-y1);
    const angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
    
    line.style.cssText = `
      position: absolute;
      width: ${length}px;
      height: 4px;
      background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
      left: ${x1}px;
      top: ${y1}px;
      transform-origin: 0 50%;
      transform: rotate(${angle}deg) scaleX(0);
      border-radius: 2px;
      box-shadow: 0 0 15px var(--neon-cyan), 0 0 30px var(--neon-pink);
      z-index: 10;
      pointer-events: none;
    `;
    
    this.boardEl.appendChild(line);
    line.animate([
      { transform: `rotate(${angle}deg) scaleX(0)` }, 
      { transform: `rotate(${angle}deg) scaleX(1)` }
    ], { duration: 400, easing: 'ease-out', fill: 'forwards' });
  }
  
  endGame(isDraw) {
    this.gameActive = false;
    
    if (isDraw) {
      this.statusEl.textContent = "Quantum Stalemate — Draw!";
      this.statusEl.classList.add('draw');
      this.scores.draw++;
      this.animateValue(this.scoreDraw, this.scores.draw);
      this.audio.playDraw();
      this.shakeBoard();
    } else {
      this.statusEl.textContent = `Player ${this.currentPlayer} Dominates!`;
      this.statusEl.classList.add('win');
      this.scores[this.currentPlayer]++;
      this.animateValue(this.currentPlayer === 'X' ? this.scoreX : this.scoreO, this.scores[this.currentPlayer]);
      this.audio.playWin();
      this.triggerConfetti();
    }
    
    this.saveScores();
  }
  
  animateValue(element, value) {
    element.classList.add('pop');
    setTimeout(() => element.classList.remove('pop'), 300);
    element.textContent = value;
  }
  
  shakeBoard() {
    this.boardEl.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(0)' }
    ], { duration: 350 });
  }
  
  triggerConfetti() {
    const colors = ['#00f0ff', '#ff00a0', '#f0ff00', '#ffffff'];
    const boardRect = this.boardEl.getBoundingClientRect();
    const originX = boardRect.left + boardRect.width/2;
    const originY = boardRect.top + boardRect.height/2;
    
    for (let i = 0; i < 60; i++) {
      const conf = document.createElement('div');
      conf.style.cssText = `
        position: fixed;
        width: ${4 + Math.random() * 4}px;
        height: ${4 + Math.random() * 4}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${originX}px;
        top: ${originY}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(conf);
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 6 + Math.random() * 12;
      const tx = Math.cos(angle) * velocity * 25;
      const ty = Math.sin(angle) * velocity * 25;
      const rot = Math.random() * 720;
      
      conf.animate([
        { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(0)`, opacity: 0 }
      ], { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' })
        .addEventListener('finish', () => conf.remove());
    }
  }
  
  updateStatus() {
    const msg = this.vsAI && this.currentPlayer === 'O' 
      ? "AI Calculating Optimal Vector..." 
      : `Player ${this.currentPlayer}'s Turn — Engage`;
    this.statusEl.textContent = msg;
    this.statusEl.className = 'status';
  }
  
  resetGame() {
    this.board.fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    
    this.cells.forEach((cell, i) => {
      cell.textContent = '';
      cell.className = 'cell';
      cell.style.pointerEvents = '';
      cell.setAttribute('aria-label', `Cell ${i + 1}, empty`);
    });
    
    document.querySelectorAll('.win-line').forEach(l => l.remove());
    this.updateStatus();
  }
  
  resetScores() {
    this.scores = { X: 0, O: 0, draw: 0 };
    this.scoreX.textContent = '0';
    this.scoreO.textContent = '0';
    this.scoreDraw.textContent = '0';
    localStorage.removeItem('ttt-scores');
    this.resetGame();
  }
  
  saveScores() {
    localStorage.setItem('ttt-scores', JSON.stringify(this.scores));
  }
  
  loadScores() {
    const saved = localStorage.getItem('ttt-scores');
    if (saved) {
      this.scores = JSON.parse(saved);
      this.scoreX.textContent = this.scores.X;
      this.scoreO.textContent = this.scores.O;
      this.scoreDraw.textContent = this.scores.draw;
    }
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bgCanvas');
  new ParticleSystem(canvas);
  new GameEngine();
});
