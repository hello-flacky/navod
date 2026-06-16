// Add some simple logic for buttons
document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const bdayBox = document.querySelector('.bday-box');

    // Confetti effect using a simple canvas implementation
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createParticles() {
        const colors = ['#4A3525', '#A52A2A', '#D2B48C', '#ffffff'];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 5 + 2,
                d: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
                tiltAngle: 0
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
            ctx.stroke();
        }
        updateParticles();
    }

    let angle = 0;
    function updateParticles() {
        angle += 0.01;
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.tiltAngle += p.tiltAngleIncrement;
            p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 2;
            p.x += Math.sin(angle);
            p.tilt = (Math.sin(p.tiltAngle) * 15);

            if (p.y > canvas.height) {
                p.x = Math.random() * canvas.width;
                p.y = -10;
                p.tilt = Math.floor(Math.random() * 10) - 10;
            }
        }
        requestAnimationFrame(drawParticles);
    }

    createParticles();
    drawParticles();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Button interactions
    if (btnYes) {
        btnYes.addEventListener('click', () => {
            btnYes.innerHTML = "Yay! 🎉";
            btnYes.style.transform = "scale(1.1)";
            setTimeout(() => {
                window.location.href = 'yes.html?animate=true';
            }, 800);
        });
    }

    if (btnNo) {
        btnNo.addEventListener('click', () => {
            window.location.href = 'no.html';
        });
    }
});
