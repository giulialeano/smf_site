import { useEffect, useRef } from 'react'

const CosmicDust = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initParticles()
    }

    const initParticles = () => {
      const particles = []
      for (let i = 0; i < 500; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.3,
          alpha: Math.random() * 0.25 + 0.05,
          speedX: (Math.random() - 0.5) * 0.04,
          speedY: (Math.random() - 0.5) * 0.03,
          twinkle: Math.random() * Math.PI * 2,
        })
      }
      particlesRef.current = particles
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.twinkle += 0.01
        
        if (p.x < -50) p.x = width + 50
        if (p.x > width + 50) p.x = -50
        if (p.y < -50) p.y = height + 50
        if (p.y > height + 50) p.y = -50
        
        const twinkleAlpha = p.alpha + Math.sin(p.twinkle) * 0.1
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 160, 240, ${twinkleAlpha * 0.5})`
        ctx.fill()
      }
      
      animationRef.current = requestAnimationFrame(draw)
    }

    resizeCanvas()
    initParticles()
    draw()
    
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7
      }}
    />
  )
}

export default CosmicDust