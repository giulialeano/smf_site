import { useEffect, useRef } from 'react'

const BlackholeParticles = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const blackholePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    let particles = particlesRef.current
    const PARTICLE_COUNT = 400

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      // Posição do buraco negro (canto superior direito)
      blackholePosRef.current = { 
        x: width * 0.78, 
        y: height * 0.25 
      }
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          trail: [] // Para rastro
        })
      }
      particlesRef.current = particles
    }

    const updateParticles = () => {
      const blackhole = blackholePosRef.current
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Calcular distância até o buraco negro
        const dx = blackhole.x - p.x
        const dy = blackhole.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Força gravitacional (mais forte quanto mais perto)
        const gravityForce = 250 / (dist * dist + 200)
        const angle = Math.atan2(dy, dx)
        
        // Aceleração na direção do buraco negro
        const accX = Math.cos(angle) * gravityForce
        const accY = Math.sin(angle) * gravityForce
        
        // Atualizar velocidade
        p.vx += accX * 0.1
        p.vy += accY * 0.1
        
        // Limitar velocidade máxima
        const maxSpeed = 5
        if (Math.abs(p.vx) > maxSpeed) p.vx = p.vx > 0 ? maxSpeed : -maxSpeed
        if (Math.abs(p.vy) > maxSpeed) p.vy = p.vy > 0 ? maxSpeed : -maxSpeed
        
        // Atualizar posição
        p.x += p.vx
        p.y += p.vy
        
        // Se a partícula "caiu" no buraco negro, renasce nas bordas
        if (dist < 35) {
          // Renascer em posição aleatória nas bordas da tela
          const side = Math.floor(Math.random() * 4)
          switch(side) {
            case 0: p.x = Math.random() * width; p.y = -20; break
            case 1: p.x = width + 20; p.y = Math.random() * height; break
            case 2: p.x = Math.random() * width; p.y = height + 20; break
            case 3: p.x = -20; p.y = Math.random() * height; break
          }
          p.vx = (Math.random() - 0.5) * 1.5
          p.vy = (Math.random() - 0.5) * 1.5
          p.alpha = 0.3
        }
        
        // Aumentar brilho quanto mais perto do buraco
        const intensity = Math.min(1, 200 / (dist + 40))
        p.currentIntensity = intensity
        
        // Bordas (se sair da tela, volta do outro lado)
        if (p.x < -100) p.x = width + 100
        if (p.x > width + 100) p.x = -100
        if (p.y < -100) p.y = height + 100
        if (p.y > height + 100) p.y = -100
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      const blackhole = blackholePosRef.current
      
      // Efeito de campo gravitacional (distorção visual)
      const gradient = ctx.createRadialGradient(
        blackhole.x, blackhole.y, 10,
        blackhole.x, blackhole.y, 180
      )
      gradient.addColorStop(0, 'rgba(94, 26, 143, 0.25)')
      gradient.addColorStop(0.4, 'rgba(94, 26, 143, 0.1)')
      gradient.addColorStop(0.7, 'rgba(94, 26, 143, 0.03)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // Desenhar linhas de fluxo (espirais orbitando)
      for (let i = 0; i < 12; i++) {
        const angle = (Date.now() * 0.0008 + i * Math.PI * 2 / 12) % (Math.PI * 2)
        ctx.beginPath()
        for (let r = 50; r < 220; r += 15) {
          const spiralAngle = angle + (r - 50) * 0.06
          const x = blackhole.x + Math.cos(spiralAngle) * r
          const y = blackhole.y + Math.sin(spiralAngle) * r
          if (r === 50) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(180, 120, 255, ${0.08 + Math.sin(Date.now() * 0.001 + i) * 0.04})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }
      
      // Desenhar partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = blackhole.x - p.x
        const dy = blackhole.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const intensity = Math.min(0.95, 280 / (dist + 60))
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (0.6 + intensity * 0.7), 0, Math.PI * 2)
        
        // Cor baseada na distância (quanto mais perto, mais quente)
        const r = 180 - Math.floor(intensity * 60)
        const g = 80 + Math.floor(intensity * 100)
        const b = 200 + Math.floor(intensity * 55)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha + intensity * 0.35})`
        ctx.fill()
        
        // Brilho adicional nas partículas próximas
        if (dist < 90) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 200, 255, ${(1 - dist / 90) * 0.2})`
          ctx.fill()
        }
      }
      
      // Anel de acreção pulsante
      const time = Date.now() * 0.004
      ctx.beginPath()
      ctx.arc(blackhole.x, blackhole.y, 70 + Math.sin(time) * 6, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 130, 255, ${0.35 + Math.sin(time) * 0.12})`
      ctx.lineWidth = 2.5
      ctx.stroke()
      
      ctx.beginPath()
      ctx.arc(blackhole.x, blackhole.y, 100 + Math.cos(time * 0.6) * 10, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(180, 90, 220, ${0.2 + Math.cos(time) * 0.08})`
      ctx.lineWidth = 1.8
      ctx.stroke()
      
      animationRef.current = requestAnimationFrame(animate)
    }

    const animate = () => {
      updateParticles()
      draw()
    }

    resizeCanvas()
    initParticles()
    animate()
    
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
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}

export default BlackholeParticles