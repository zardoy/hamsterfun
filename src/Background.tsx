//@ts-nocheck
import React, { useRef, useEffect } from 'react'

const FuturisticGridBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')!
        let animationFrameId

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Grid properties
        const gridSize = 50
        const gridColor = 'rgba(0, 195, 255, 0.3)'

        // Particle properties
        const particles = []
        const particleCount = 10
        const particleRadius = 3
        const particleColor = 'rgba(0, 255, 255, 1)'
        const particleSpeed = 1

        class Particle {
            constructor() {
                this.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize
                this.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
                this.direction = Math.floor(Math.random() * 4) // 0: right, 1: down, 2: left, 3: up
            }

            move() {
                switch (this.direction) {
                    case 0: {
                        // right
                        this.x += particleSpeed
                        if (this.x >= canvas.width) this.x = 0
                        break
                    }

                    case 1: {
                        // down
                        this.y += particleSpeed
                        if (this.y >= canvas.height) this.y = 0
                        break
                    }

                    case 2: {
                        // left
                        this.x -= particleSpeed
                        if (this.x < 0) this.x = canvas.width - gridSize
                        break
                    }

                    case 3: {
                        // up
                        this.y -= particleSpeed
                        if (this.y < 0) this.y = canvas.height - gridSize
                        break
                    }
                }

                // Change direction at intersections
                if (this.x % gridSize === 0 && this.y % gridSize === 0) {
                    this.direction = Math.floor(Math.random() * 4)
                }
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2)
                ctx.fillStyle = particleColor
                ctx.fill()

                // Enhanced glow effect
                ctx.shadowBlur = 15
                ctx.shadowColor = particleColor
                ctx.fill()
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        // Draw grid
        const drawGrid = () => {
            ctx.strokeStyle = gridColor
            ctx.lineWidth = 1

            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, canvas.height)
                ctx.stroke()
            }

            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(canvas.width, y)
                ctx.stroke()
            }
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, '#000033')
            gradient.addColorStop(1, '#000011')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            drawGrid()

            for (const particle of particles) {
                particle.move()
                particle.draw()
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
}

export default FuturisticGridBackground
