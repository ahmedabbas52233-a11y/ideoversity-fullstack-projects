const SimplexNoise = (function () {
  const grad3 = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1],
  ];
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Shuffle
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function dot(g, x, y) {
    return g[0] * x + g[1] * y;
  }

  return {
    noise2D: function (xin, yin) {
      const F2 = 0.5 * (Math.sqrt(3) - 1),
        G2 = (3 - Math.sqrt(3)) / 6;
      let s = (xin + yin) * F2;
      let i = Math.floor(xin + s),
        j = Math.floor(yin + s);
      let t = (i + j) * G2;
      let X0 = i - t,
        Y0 = j - t;
      let x0 = xin - X0,
        y0 = yin - Y0;
      let i1, j1;
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } else {
        i1 = 0;
        j1 = 1;
      }
      let x1 = x0 - i1 + G2,
        y1 = y0 - j1 + G2;
      let x2 = x0 - 1 + 2 * G2,
        y2 = y0 - 1 + 2 * G2;
      let ii = i & 255,
        jj = j & 255;
      let gi0 = perm[ii + perm[jj]] % 12;
      let gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
      let gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
      let t0 = 0.5 - x0 * x0 - y0 * y0;
      let n0 = t0 < 0 ? 0 : ((t0 *= t0), t0 * t0 * dot(grad3[gi0], x0, y0));
      let t1 = 0.5 - x1 * x1 - y1 * y1;
      let n1 = t1 < 0 ? 0 : ((t1 *= t1), t1 * t1 * dot(grad3[gi1], x1, y1));
      let t2 = 0.5 - x2 * x2 - y2 * y2;
      let n2 = t2 < 0 ? 0 : ((t2 *= t2), t2 * t2 * dot(grad3[gi2], x2, y2));
      return 70 * (n0 + n1 + n2);
    },
  };
})();

// ============================================================
// AUDIO ENGINE — Spatial Ambient Synthesis
// ============================================================
class ElysiumAudio {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.reverb = null;
    this.isPlaying = false;
    this.oscillators = [];
  }

  init() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.35;

    // Synthetic reverb
    this.reverb = this.ctx.createConvolver();
    this.createReverbImpulse();

    const reverbGain = this.ctx.createGain();
    reverbGain.gain.value = 0.35;
    this.masterGain.connect(reverbGain);
    reverbGain.connect(this.reverb);
    this.reverb.connect(this.ctx.destination);
    this.masterGain.connect(this.ctx.destination);
  }

  createReverbImpulse() {
    const rate = this.ctx.sampleRate;
    const length = rate * 3;
    const decay = 2.5;
    const impulse = this.ctx.createBuffer(2, length, rate);
    for (let c = 0; c < 2; c++) {
      const ch = impulse.getChannelData(c);
      for (let i = 0; i < length; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }
    this.reverb.buffer = impulse;
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Harmonic pad
    const freqs = [110, 146.83, 164.81, 196, 220, 293.66, 329.63];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i < 3 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      gain.gain.value = 0.012;
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);

      // Detune LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.04 + Math.random() * 0.06;
      lfoGain.gain.value = 1.2;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
    });

    this.startWind();
    this.startWater();
    this.scheduleCrickets();
  }

  startWind() {
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 250;
    filter.Q.value = 0.5;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.02;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    src.start();
    this.oscillators.push(src);

    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.025;
    lfoGain.gain.value = 200;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
  }

  startWater() {
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++)
      data[i] = (Math.random() * 2 - 1) * 0.5;

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.018;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    src.start();
    this.oscillators.push(src);
  }

  scheduleCrickets() {
    const chirp = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      // Chirp burst
      for (let k = 0; k < 3; k++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const base = 3500 + Math.random() * 800;
        osc.frequency.setValueAtTime(base, now + k * 0.08);
        gain.gain.setValueAtTime(0, now + k * 0.08);
        gain.gain.linearRampToValueAtTime(0.006, now + k * 0.08 + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, now + k * 0.08 + 0.06);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + k * 0.08);
        osc.stop(now + k * 0.08 + 0.08);
      }
      setTimeout(chirp, 600 + Math.random() * 1500);
    };
    setTimeout(chirp, 2000);
  }

  playBird() {
    if (!this.isPlaying) return;
    const now = this.ctx.currentTime;
    [0, 0.1, 0.18].forEach((offset, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const base = 2000 + Math.random() * 500;
      osc.frequency.setValueAtTime(base, now + offset);
      osc.frequency.exponentialRampToValueAtTime(
        base * (1.2 + i * 0.1),
        now + offset + 0.05
      );
      gain.gain.setValueAtTime(0, now + offset);
      gain.gain.linearRampToValueAtTime(0.012, now + offset + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + offset);
      osc.stop(now + offset + 0.2);
    });
  }

  setIntensity(nightness) {
    if (!this.masterGain) return;
    this.masterGain.gain.setTargetAtTime(
      0.2 + nightness * 0.2,
      this.ctx.currentTime,
      0.5
    );
  }
}

function createTerrain() {
  const size = 200;
  const segments = 128;
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  const pos = geo.attributes.position;
  const colors = [];
  const color = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    // FBM
    let h = 0;
    h += SimplexNoise.noise2D(x * 0.015, y * 0.015) * 10;
    h += SimplexNoise.noise2D(x * 0.04, y * 0.04) * 5;
    h += SimplexNoise.noise2D(x * 0.08, y * 0.08) * 2;
    h += SimplexNoise.noise2D(x * 0.16, y * 0.16) * 0.8;

    // Valley flattening
    if (h < -1) h = -1 + (h + 1) * 0.2;

    pos.setZ(i, h);

    if (h > 8) {
      color.setHex(0x7a8b99); // Rock/snow
    } else if (h > 4) {
      color.setHex(0x5d7a5d); // Alpine
    } else if (h > 1) {
      color.setHex(0x4a7c59); // Forest
    } else if (h > -0.5) {
      color.setHex(0x5a9a5a); // Grass
    } else {
      color.setHex(0x4a7a4a); // Wetland
    }
    colors.push(color.r, color.g, color.b);
  }

  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.0,
    flatShading: true,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createWater() {
  const vertexShader = `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
            vUv = uv;
            vec3 pos = position;
            float e = sin(pos.x * 0.4 + uTime * 0.8) * 0.12
                    + sin(pos.y * 0.3 + uTime * 0.6) * 0.08
                    + sin((pos.x + pos.y) * 0.2 + uTime * 1.0) * 0.06;
            pos.z += e;
            vElevation = e;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

  const fragmentShader = `
        uniform float uTime;
        uniform vec3 uColorDay;
        uniform vec3 uColorNight;
        uniform float uNight;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
            vec3 base = mix(uColorDay, uColorNight, uNight);
            
            // Foam
            float foam = smoothstep(0.12, 0.22, vElevation + sin(vUv.x * 25.0 + uTime * 2.0) * 0.04);
            vec3 foamCol = vec3(0.85, 0.92, 1.0);
            base = mix(base, foamCol, foam * 0.25);
            
            // Specular
            float spec = sin(vUv.x * 35.0 + uTime * 2.5) * sin(vUv.y * 28.0 + uTime * 2.0);
            spec = smoothstep(0.75, 1.0, spec) * 0.25 * (1.0 - uNight);
            base += vec3(spec);
            
            gl_FragColor = vec4(base, 0.72);
        }
    `;

  const geo = new THREE.PlaneGeometry(200, 200, 100, 100);
  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColorDay: { value: new THREE.Color(0x4a9aaa) },
      uColorNight: { value: new THREE.Color(0x0a1a2a) },
      uNight: { value: 0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.2;
  return { mesh, material: mat };
}

function createSky() {
  const vertexShader = `
        varying vec3 vWorldPos;
        void main() {
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
        }
    `;

  const fragmentShader = `
        uniform vec3 uSunDir;
        uniform float uSunIntensity;
        uniform float uNight;
        varying vec3 vWorldPos;
        
        void main() {
            vec3 dir = normalize(vWorldPos);
            float y = dir.y;
            
            // Day colors
            vec3 dayTop = vec3(0.31, 0.60, 0.95);
            vec3 dayBot = vec3(0.50, 0.85, 1.0);
            vec3 daySky = mix(dayBot, dayTop, max(0.0, y * 0.5 + 0.5));
            
            // Night colors
            vec3 nightTop = vec3(0.01, 0.01, 0.05);
            vec3 nightBot = vec3(0.03, 0.02, 0.08);
            vec3 nightSky = mix(nightBot, nightTop, max(0.0, y * 0.5 + 0.5));
            
            vec3 sky = mix(daySky, nightSky, uNight);
            
            // Sun
            float sunDist = distance(dir, uSunDir);
            float sunDisc = 1.0 - smoothstep(0.015, 0.035, sunDist);
            float sunGlow = 1.0 - smoothstep(0.0, 0.35, sunDist);
            vec3 sunCol = vec3(1.0, 0.88, 0.5) * sunDisc * uSunIntensity;
            sunCol += vec3(1.0, 0.75, 0.35) * sunGlow * 0.3 * uSunIntensity;
            
            // Moon (opposite sun)
            vec3 moonDir = -uSunDir;
            float moonDist = distance(dir, moonDir);
            float moonDisc = 1.0 - smoothstep(0.012, 0.022, moonDist);
            float moonGlow = 1.0 - smoothstep(0.0, 0.12, moonDist);
            vec3 moonCol = vec3(0.95, 0.95, 1.0) * moonDisc * (1.0 - uSunIntensity);
            moonCol += vec3(0.7, 0.7, 0.9) * moonGlow * 0.12 * (1.0 - uSunIntensity);
            
            sky += sunCol + moonCol;
            
            // Stars
            if (uNight > 0.1) {
                float star = fract(sin(dot(dir.xy * 50.0, vec2(12.9898, 78.233))) * 43758.5453);
                float star2 = fract(sin(dot(dir.yz * 50.0, vec2(43.2321, 17.5112))) * 23421.631);
                float s = step(0.997, star) + step(0.998, star2) * 0.5;
                s *= smoothstep(-0.1, 0.3, y);
                sky += vec3(s) * uNight;
            }
            
            // Horizon haze
            float haze = exp(-abs(y) * 3.0) * 0.3;
            vec3 hazeColor = mix(vec3(0.8, 0.9, 1.0), vec3(0.1, 0.1, 0.2), uNight);
            sky = mix(sky, hazeColor, haze);
            
            gl_FragColor = vec4(sky, 1.0);
        }
    `;

  const geo = new THREE.SphereGeometry(400, 32, 32);
  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uSunDir: { value: new THREE.Vector3(0, 0.1, -1) },
      uSunIntensity: { value: 1.0 },
      uNight: { value: 0.0 },
    },
    side: THREE.BackSide,
  });

  return new THREE.Mesh(geo, mat);
}

function createFireflies() {
  const count = 200;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = Math.random() * 12 + 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.3 + Math.random() * 0.7;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
  geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

  const mat = new THREE.ShaderMaterial({
    vertexShader: `
            attribute float phase;
            attribute float speed;
            varying float vAlpha;
            uniform float uTime;
            uniform float uNight;
            
            void main() {
                vec3 pos = position;
                pos.x += sin(uTime * speed + phase) * 3.0;
                pos.y += sin(uTime * speed * 0.8 + phase * 1.5) * 1.2;
                pos.z += cos(uTime * speed * 0.6 + phase * 0.7) * 2.5;
                
                vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                gl_Position = projectionMatrix * mv;
                gl_PointSize = (6.0 + sin(uTime * 3.0 + phase) * 3.0) * (200.0 / -mv.z);
                
                float blink = sin(uTime * 2.5 + phase) * 0.5 + 0.5;
                float breathe = sin(uTime * 0.5 + phase) * 0.3 + 0.7;
                vAlpha = blink * breathe * uNight;
            }
        `,
    fragmentShader: `
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float glow = 1.0 - smoothstep(0.0, 0.5, d);
                vec3 col = vec3(0.85, 1.0, 0.2);
                gl_FragColor = vec4(col, glow * vAlpha);
            }
        `,
    uniforms: {
      uTime: { value: 0 },
      uNight: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geo, mat);
}

function createDeer() {
  const group = new THREE.Group();
  const brown = new THREE.MeshStandardMaterial({
    color: 0x8b5a2b,
    flatShading: true,
    roughness: 0.9,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x5d3a1a,
    flatShading: true,
  });

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.75, 0.65), brown);
  body.position.y = 1.5;
  body.castShadow = true;
  group.add(body);

  // Neck
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.9, 0.3), brown);
  neck.position.set(0.55, 2.1, 0);
  neck.rotation.z = -0.35;
  group.add(neck);

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.4, 0.38), brown);
  head.position.set(0.85, 2.55, 0);
  head.castShadow = true;
  group.add(head);

  // Snout
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.18, 0.22), dark);
  snout.position.set(1.05, 2.5, 0);
  group.add(snout);

  // Ears
  [
    [-0.08, 0.08],
    [0.08, -0.08],
  ].forEach(([ox, oz]) => {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.25, 4), brown);
    ear.position.set(0.85, 2.85, oz);
    ear.rotation.z = ox > 0 ? -0.2 : 0.2;
    ear.rotation.x = oz > 0 ? 0.3 : -0.3;
    group.add(ear);
  });

  // Antlers
  const antlerMat = new THREE.MeshStandardMaterial({
    color: 0x4a3728,
    flatShading: true,
  });
  [
    [-0.12, 0.1],
    [0.12, -0.1],
  ].forEach(([ox, oz]) => {
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.035, 0.5, 4),
      antlerMat
    );
    stem.position.set(0.85 + ox, 2.95, oz);
    stem.rotation.z = ox > 0 ? -0.25 : 0.25;
    group.add(stem);

    // Branch
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 0.2, 4),
      antlerMat
    );
    branch.position.set(0.85 + ox * 1.5, 3.15, oz);
    branch.rotation.z = ox > 0 ? 0.5 : -0.5;
    group.add(branch);
  });

  // Eyes
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
  [
    [0.88, 0.06],
    [0.88, -0.06],
  ].forEach(([x, z]) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), eyeMat);
    eye.position.set(x, 2.6, z);
    group.add(eye);
  });

  // Legs
  const legGeo = new THREE.BoxGeometry(0.1, 0.9, 0.1);
  [
    [-0.4, -0.2],
    [0.4, -0.2],
    [-0.4, 0.2],
    [0.4, 0.2],
  ].forEach(([x, z], i) => {
    const leg = new THREE.Mesh(legGeo, brown);
    leg.position.set(x, 0.9, z);
    leg.userData = { isLeg: true, index: i, baseY: 0.9 };
    leg.castShadow = true;
    group.add(leg);
  });

  // Tail
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 4), brown);
  tail.position.set(-0.7, 1.7, 0);
  tail.rotation.z = 1.2;
  group.add(tail);

  group.position.set(8, -1.2, 12);
  group.rotation.y = -0.4;
  return group;
}

function createRabbit() {
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({
    color: 0xe8e0d8,
    flatShading: true,
    roughness: 0.9,
  });
  const pink = new THREE.MeshStandardMaterial({
    color: 0xf0a0a0,
    flatShading: true,
  });

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), white);
  body.scale.set(1, 0.8, 1.1);
  body.position.y = 0.35;
  body.castShadow = true;
  group.add(body);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), white);
  head.position.set(0.3, 0.55, 0);
  group.add(head);

  // Ears
  [
    [0.22, 0.08],
    [0.22, -0.08],
  ].forEach(([x, z]) => {
    const ear = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.06, 0.4, 6),
      white
    );
    ear.position.set(0.35, 0.85, z);
    ear.rotation.x = z > 0 ? 0.15 : -0.15;
    ear.rotation.z = -0.1;
    group.add(ear);

    const inner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.03, 0.25, 6),
      pink
    );
    inner.position.set(0.35, 0.85, z);
    inner.rotation.x = ear.rotation.x;
    inner.rotation.z = -0.1;
    group.add(inner);
  });

  // Eye
  const eye = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  eye.position.set(0.42, 0.58, 0.08);
  group.add(eye);

  // Nose
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), pink);
  nose.position.set(0.48, 0.52, 0);
  group.add(nose);

  // Tail
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), white);
  tail.position.set(-0.3, 0.35, 0);
  group.add(tail);

  group.position.set(-6, -1.2, 15);
  group.scale.setScalar(1.2);
  return group;
}

function createBird() {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    flatShading: true,
  });

  const body = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 4), mat);
  body.rotation.z = -Math.PI / 2;
  group.add(body);

  const wingGeo = new THREE.BoxGeometry(0.25, 0.015, 0.1);
  const leftWing = new THREE.Mesh(wingGeo, mat);
  leftWing.position.set(0, 0.04, 0.07);
  group.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeo, mat);
  rightWing.position.set(0, 0.04, -0.07);
  group.add(rightWing);

  group.userData = {
    wings: [leftWing, rightWing],
    speed: 0.12 + Math.random() * 0.08,
    radius: 18 + Math.random() * 12,
    height: 10 + Math.random() * 8,
    offset: Math.random() * Math.PI * 2,
  };

  return group;
}

function createOwl() {
  const group = new THREE.Group();
  const feather = new THREE.MeshStandardMaterial({
    color: 0x6b4423,
    flatShading: true,
    roughness: 0.95,
  });
  const belly = new THREE.MeshStandardMaterial({
    color: 0xc4a574,
    flatShading: true,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x2a1f15,
    flatShading: true,
  });

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), feather);
  body.scale.set(1, 1.2, 0.9);
  body.position.y = 2;
  group.add(body);

  // Belly
  const bellyMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), belly);
  bellyMesh.scale.set(0.8, 1, 0.6);
  bellyMesh.position.set(0.1, 2, 0);
  group.add(bellyMesh);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 8, 8), feather);
  head.position.set(0, 2.85, 0);
  group.add(head);

  // Eyes
  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
  const eyePupil = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });

  [
    [-0.12, 0.12],
    [-0.12, -0.12],
  ].forEach(([x, z]) => {
    const white = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 8, 8),
      eyeWhite
    );
    white.position.set(x, 2.9, z);
    group.add(white);

    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      eyePupil
    );
    pupil.position.set(x - 0.03, 2.9, z);
    group.add(pupil);
  });

  // Beak
  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.1, 4),
    new THREE.MeshStandardMaterial({ color: 0xe67e22 })
  );
  beak.position.set(0.32, 2.85, 0);
  beak.rotation.z = -Math.PI / 2;
  group.add(beak);

  // Wings
  [
    [0, 0.35],
    [0, -0.35],
  ].forEach(([y, z]) => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 0.05), feather);
    wing.position.set(-0.1, 2.1, z);
    wing.rotation.y = z > 0 ? 0.2 : -0.2;
    group.add(wing);
  });

  // Feet
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.06, 0.2), dark);
  foot.position.set(0.1, 1.35, 0);
  group.add(foot);

  group.position.set(12, 0, -5);
  group.scale.setScalar(1.3);
  group.visible = false;
  return group;
}

function createTree(x, z, scale) {
  const group = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x5d4037,
    flatShading: true,
    roughness: 0.95,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x2d7a3d,
    flatShading: true,
    roughness: 0.9,
  });

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15 * scale, 0.22 * scale, 2.5 * scale, 6),
    trunkMat
  );
  trunk.position.y = 1.25 * scale;
  trunk.castShadow = true;
  group.add(trunk);

  const foliage1 = new THREE.Mesh(
    new THREE.ConeGeometry(1.2 * scale, 2 * scale, 6),
    leafMat
  );
  foliage1.position.y = 2.8 * scale;
  foliage1.castShadow = true;
  group.add(foliage1);

  const foliage2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.9 * scale, 1.5 * scale, 6),
    leafMat
  );
  foliage2.position.y = 3.8 * scale;
  foliage2.castShadow = true;
  group.add(foliage2);

  group.position.set(x, -1.2, z);
  return group;
}

class Elysium {
  constructor() {
    this.time = 6.0;
    this.speed = 1;
    this.running = true;
    this.clock = new THREE.Clock();
    this.audio = new ElysiumAudio();

    this.initRenderer();
    this.initScene();
    this.initPostProcessing();
    this.initUI();

    // Hide loader once Three.js is ready
    document.getElementById('loader').classList.add('hidden');

    this.animate();
  }

  initRenderer() {
    this.canvas = document.getElementById('glCanvas');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      if (this.composer) {
        this.composer.setSize(window.innerWidth, window.innerHeight);
      }
    });
  }

  initScene() {
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 8, 32);
    this.camera.lookAt(0, 2, 0);

    // Fog
    this.scene.fog = new THREE.FogExp2(0x87ceeb, 0.007);

    // Lights
    this.sunLight = new THREE.DirectionalLight(0xfff5e6, 1.5);
    this.sunLight.position.set(50, 30, 50);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 200;
    this.sunLight.shadow.camera.left = -60;
    this.sunLight.shadow.camera.right = 60;
    this.sunLight.shadow.camera.top = 60;
    this.sunLight.shadow.camera.bottom = -60;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight(0x404060, 0.4);
    this.scene.add(this.ambientLight);

    this.moonLight = new THREE.DirectionalLight(0x8888ff, 0.0);
    this.moonLight.position.set(-50, 30, -50);
    this.scene.add(this.moonLight);

    // Terrain
    this.terrain = createTerrain();
    this.scene.add(this.terrain);

    // Water
    const waterObj = createWater();
    this.water = waterObj.mesh;
    this.waterMaterial = waterObj.material;
    this.scene.add(this.water);

    // Sky
    this.sky = createSky();
    this.scene.add(this.sky);

    // Fireflies
    this.fireflies = createFireflies();
    this.scene.add(this.fireflies);

    // Animals
    this.deer = createDeer();
    this.scene.add(this.deer);

    this.rabbit = createRabbit();
    this.scene.add(this.rabbit);

    this.owl = createOwl();
    this.scene.add(this.owl);

    // Birds
    this.birds = [];
    for (let i = 0; i < 8; i++) {
      const bird = createBird();
      this.birds.push(bird);
      this.scene.add(bird);
    }

    // Trees
    const treePositions = [
      [-15, 8, 1.2],
      [18, 12, 0.9],
      [-22, -5, 1.5],
      [25, -8, 1.1],
      [-8, 20, 0.8],
      [12, 22, 1.3],
      [-30, 5, 1.0],
      [30, 15, 0.85],
      [5, -20, 1.4],
      [-12, -18, 1.0],
      [20, -15, 1.2],
      [-25, -12, 0.9],
    ];
    treePositions.forEach(([x, z, s]) => {
      this.scene.add(createTree(x, z, s));
    });
  }

  initPostProcessing() {
    // Check if post-processing loaded
    if (typeof THREE.EffectComposer === 'undefined') {
      console.warn('Post-processing not available, using standard render');
      this.composer = null;
      return;
    }

    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

    this.bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.35,
      0.8,
      0.85
    );
    this.composer.addPass(this.bloomPass);
  }

  initUI() {
    this.slider = document.getElementById('timeSlider');
    this.playBtn = document.getElementById('playPause');

    document.getElementById('enterBtn').addEventListener('click', () => {
      document.getElementById('startScreen').classList.add('hidden');
      this.audio.start();
    });

    this.playBtn.addEventListener('click', () => {
      this.running = !this.running;
      this.playBtn.textContent = this.running ? '⏸' : '▶';
    });

    this.slider.addEventListener('input', (e) => {
      this.time = parseFloat(e.target.value);
      this.running = false;
      this.playBtn.textContent = '▶';
    });

    document.querySelectorAll('.spd').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document
          .querySelectorAll('.spd')
          .forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');
        const s = parseFloat(e.target.dataset.speed);
        if (s === 0) {
          this.running = false;
          this.playBtn.textContent = '▶';
        } else {
          this.speed = s;
          if (!this.running) {
            this.running = true;
            this.playBtn.textContent = '⏸';
          }
        }
      });
    });
  }

  updateTimeOfDay() {
    const t = this.time;
    const sunAngle = ((t - 6) / 24) * Math.PI * 2; // 6am = sunrise
    const sunY = Math.sin(sunAngle);
    const sunX = Math.cos(sunAngle);

    // Sun light
    this.sunLight.position.set(sunX * 80, Math.max(0.1, sunY) * 60, 30);
    this.sunLight.intensity = Math.max(0, sunY) * 1.5;

    // Moon (opposite)
    this.moonLight.position.set(-sunX * 80, Math.max(0.1, -sunY) * 60, -30);
    this.moonLight.intensity = Math.max(0, -sunY) * 0.8;

    // Sky uniforms
    const sunDir = new THREE.Vector3(
      sunX,
      Math.max(0.05, sunY),
      -0.5
    ).normalize();
    this.sky.material.uniforms.uSunDir.value.copy(sunDir);
    this.sky.material.uniforms.uSunIntensity.value = Math.max(0, sunY * 2);
    const nightness = Math.max(0, -sunY * 1.5);
    this.sky.material.uniforms.uNight.value = Math.min(1, nightness);

    // Water
    this.waterMaterial.uniforms.uNight.value = Math.min(1, nightness);

    // Fireflies
    this.fireflies.material.uniforms.uNight.value = Math.max(0, (t - 19) / 5);

    // Fog
    const dayColor = new THREE.Color(0x87ceeb);
    const nightColor = new THREE.Color(0x0a0a1a);
    const duskColor = new THREE.Color(0xfa709a);

    let fogColor;
    if (t < 5 || t > 21) fogColor = nightColor;
    else if (t < 7)
      fogColor = dayColor.clone().lerp(duskColor, 1 - (t - 5) / 2);
    else if (t > 19) fogColor = dayColor.clone().lerp(duskColor, (t - 19) / 2);
    else fogColor = dayColor;

    this.scene.fog.color.copy(fogColor);
    this.scene.fog.density = 0.006 + Math.max(0, -sunY) * 0.012;

    // Ambient
    const ambientDay = new THREE.Color(0x404060);
    const ambientNight = new THREE.Color(0x101020);
    this.ambientLight.color.copy(
      ambientDay.clone().lerp(ambientNight, Math.min(1, nightness))
    );

    // Bloom
    if (this.bloomPass) {
      this.bloomPass.strength = 0.25 + Math.max(0, nightness) * 0.45;
    }

    // Owl visibility
    this.owl.visible = t > 19 || t < 5;

    // Audio
    this.audio.setIntensity(nightness);

    // UI
    this.updateUI();
  }

  updateUI() {
    const h = Math.floor(this.time);
    const m = Math.floor((this.time % 1) * 60);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const dh = h % 12 || 12;
    document.getElementById('clock').textContent =
      `${dh}:${m.toString().padStart(2, '0')} ${ampm}`;

    const temp = 22 + 8 * Math.sin(((this.time - 8) * Math.PI) / 12);
    document.getElementById('temp').textContent = `${Math.round(temp)}°C`;

    const wind = 2 + Math.sin(this.time * 0.5) * 2 + Math.random() * 0.5;
    document.getElementById('wind').textContent = `${wind.toFixed(1)} m/s`;

    let phase = 'Night';
    if (this.time >= 5 && this.time < 8) phase = 'Dawn';
    else if (this.time >= 8 && this.time < 17) phase = 'Day';
    else if (this.time >= 17 && this.time < 21) phase = 'Dusk';
    document.getElementById('phase').textContent = phase;

    const moods = {
      Dawn: 'The valley stirs beneath a rose sky...',
      Day: 'Sunlight dances on the water...',
      Dusk: 'Golden light paints the hills...',
      Night: 'Fireflies dance under starlight...',
    };
    document.getElementById('mood').textContent = moods[phase] || '';
  }

  animateAnimals(elapsed) {
    // Deer breathing
    const deerBody = this.deer.children[0];
    deerBody.scale.y = 1 + Math.sin(elapsed * 2.2) * 0.015;
    deerBody.scale.x = 1 + Math.sin(elapsed * 2.2 + 1) * 0.008;

    // Deer head look
    this.deer.children[2].rotation.y = Math.sin(elapsed * 0.4) * 0.2;

    // Deer tail flick
    this.deer.children[this.deer.children.length - 1].rotation.z =
      1.2 + Math.sin(elapsed * 3) * 0.1;

    // Rabbit hop (occasional)
    const hopPhase = (elapsed % 4) / 4;
    if (hopPhase < 0.15) {
      this.rabbit.position.y =
        -1.2 + Math.sin((hopPhase / 0.15) * Math.PI) * 0.4;
    } else {
      this.rabbit.position.y = -1.2;
    }

    // Rabbit ear twitch
    this.rabbit.children[2].rotation.z = -0.1 + Math.sin(elapsed * 5) * 0.05;
    this.rabbit.children[3].rotation.z = 0.1 + Math.sin(elapsed * 5 + 2) * 0.05;

    // Owl head turn
    if (this.owl.visible) {
      this.owl.children[2].rotation.y = Math.sin(elapsed * 0.6) * 0.4;
      // Blink
      const blink = Math.sin(elapsed * 0.8) > 0.95;
      this.owl.children[2].position.y = blink ? 2.82 : 2.85;
    }

    // Birds
    this.birds.forEach((bird, i) => {
      const d = bird.userData;
      const angle = elapsed * d.speed + d.offset;
      bird.position.set(
        Math.cos(angle) * d.radius,
        d.height + Math.sin(angle * 2.5) * 2,
        Math.sin(angle) * d.radius
      );
      bird.rotation.y = -angle + Math.PI / 2;

      const flap = Math.sin(elapsed * 12 + i) * 0.6;
      d.wings[0].rotation.z = flap;
      d.wings[1].rotation.z = -flap;
    });

    // Random bird chirp
    if (this.time > 5 && this.time < 20 && Math.random() < 0.0015) {
      this.audio.playBird();
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    if (this.running) {
      this.time += 0.004 * this.speed;
      if (this.time >= 24) this.time = 0;
      this.slider.value = this.time;
    }

    this.updateTimeOfDay();
    this.animateAnimals(elapsed);

    // Shader updates
    this.waterMaterial.uniforms.uTime.value = elapsed;
    this.fireflies.material.uniforms.uTime.value = elapsed;

    // Camera drift
    this.camera.position.x = Math.sin(elapsed * 0.04) * 4;
    this.camera.position.y = 8 + Math.sin(elapsed * 0.06) * 1.5;
    this.camera.lookAt(0, 1.5, 0);

    // Render
    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', () => {
  // Check Three.js loaded
  if (typeof THREE === 'undefined') {
    document.querySelector('.loader p').textContent =
      'Failed to load 3D engine. Please check your connection.';
    document.querySelector('.loader-ring').style.borderColor = '#ff4444';
    return;
  }
  new Elysium();
});
