function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
}

function createClouds() {
    const cloudsContainer = document.getElementById('clouds');
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const width = Math.random() * 100 + 80;
        cloud.style.width = width + 'px';
        cloud.style.height = (width * 0.4) + 'px';
        cloud.style.left = (Math.random() * 80 + 10) + '%';
        cloud.style.top = (Math.random() * 30 + 5) + '%';
        
        const before = document.createElement('div');
        before.style.width = (width * 0.5) + 'px';
        before.style.height = (width * 0.5) + 'px';
        before.style.top = -(width * 0.25) + 'px';
        before.style.left = (width * 0.15) + 'px';
        before.style.borderRadius = '50%';
        before.style.background = '#fff';
        before.style.position = 'absolute';
        
        cloud.appendChild(before);
        cloudsContainer.appendChild(cloud);
    }
}

function updateSky(value) {
    const scene = document.getElementById('scene');
    if (value > 50) {
        scene.classList.add('night');
    } else {
        scene.classList.remove('night');
    }
}

createStars();
createClouds();