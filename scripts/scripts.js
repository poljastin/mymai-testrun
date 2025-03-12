document.addEventListener("DOMContentLoaded", () => {
    // Confetti Effect
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let confetti = [];

    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 2;
            this.speedY = Math.random() * 3 + 1;
            this.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
        }
        update() {
            this.y += this.speedY;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initConfetti() {
        confetti = [];
        for (let i = 0; i < 100; i++) {
            confetti.push(new ConfettiParticle());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    initConfetti();
    animateConfetti();

    // Vertical Carousel Movement (Smooth, Infinite, No Flicker)
    function startCarousel(selector, direction) {
        const track = document.querySelector(selector);
        const items = Array.from(track.children);
        const totalHeight = items.reduce((acc, item) => acc + item.clientHeight, 0);
        
        track.innerHTML += track.innerHTML; // Duplicate for seamless effect
        track.style.position = "absolute";
        track.style.top = "0";

        let translateY = 0;
        let animationSpeed = 1.2 * direction; // Adjust speed

        function animateCarousel() {
            translateY += animationSpeed;
            if (direction === -1 && translateY <= -totalHeight) {
                translateY = 0;
            } else if (direction === 1 && translateY >= 0) {
                translateY = -totalHeight;
            }
            track.style.transform = `translateY(${translateY}px)`;
            requestAnimationFrame(animateCarousel);
        }

        requestAnimationFrame(animateCarousel);
    }

    startCarousel(".carousel.left .carousel-track", -1); // Scroll up
    startCarousel(".carousel.right .carousel-track", 1); // Scroll down
});
