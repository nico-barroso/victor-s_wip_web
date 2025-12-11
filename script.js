const canvas = document.getElementById("background-animation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.y = Math.random() * canvas.height;
    this.amplitude = Math.random() * 50 + 20;
    this.frequency = Math.random() * 0.01 + 0.002;
    this.phase = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.05 + 0.01;
  }

  update() {
    this.phase -= this.speed;
  }

  draw() {
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 5) {
      const y =
        this.y + Math.sin(x * this.frequency + this.phase) * this.amplitude;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
