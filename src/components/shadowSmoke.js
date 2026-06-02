import { useEffect, useRef } from "react";

export default function ShadowFlames() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const particles = [];

        canvas.width = 400;
        canvas.height = 400;

        class Particle {
            constructor() {
                this.x = 200 + (Math.random() - 0.5) * 40;
                this.y = 250;

                this.size = 10 + Math.random() * 25;

                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = -1 - Math.random() * 2;

                this.life = 100;
                this.maxLife = this.life;

                this.red = Math.random() < 0.25;
            }

            update() {
                this.x += this.vx;

                this.x += Math.sin(this.life * 0.1) * 0.4;

                this.y += this.vy;

                this.size += 0.15;

                this.life--;
            }

            draw() {
                const alpha = this.life / this.maxLife;

                ctx.beginPath();

                const gradient = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    0,
                    this.x,
                    this.y,
                    this.size
                );

                if (this.red) {
                    gradient.addColorStop(
                        0,
                        `rgba(255,0,0,${alpha})`
                    );

                    gradient.addColorStop(
                        1,
                        `rgba(120,0,0,0)`
                    );
                } else {
                    gradient.addColorStop(
                        0,
                        `rgba(0,0,0,${alpha})`
                    );

                    gradient.addColorStop(
                        1,
                        `rgba(0,0,0,0)`
                    );
                }

                ctx.fillStyle = gradient;

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            if (particles.length < 150) {
                particles.push(new Particle());
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                p.update();
                p.draw();

                if (p.life <= 0) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="shadowFlames"
        />
    );
}