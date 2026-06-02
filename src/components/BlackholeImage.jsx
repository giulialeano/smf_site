import { useEffect, useRef } from 'react'

const BlackholeImage = () => {
  const imgRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    let time = 0

    const animate = () => {
      if (!imgRef.current) return
      
      time += 0.01
      const scale = 1 + Math.sin(time) * 0.03
      const rotate = Math.sin(time * 0.4) * 2
      const translateX = Math.sin(time * 0.6) * 4
      const translateY = Math.cos(time * 0.5) * 3
      const opacity = 0.8 + Math.sin(time * 1.2) * 0.1
      
      imgRef.current.style.transform = `scale(${scale}) rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`
      imgRef.current.style.opacity = opacity
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="blackhole-image-container">
      <img 
        ref={imgRef}
        src="/buraco-negro.png"
        alt="Buraco Negro"
        className="blackhole-image"
        onError={(e) => {
          console.warn('Imagem do buraco negro não encontrada')
          e.target.style.display = 'none'
        }}
      />
      <div className="blackhole-ring"></div>
      <div className="blackhole-glow"></div>
    </div>
  )
}

export default BlackholeImage