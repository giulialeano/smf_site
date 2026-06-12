import { useState } from 'react'

const Camisetas = () => {
  const [selectedColor, setSelectedColor] = useState('branca')
  const [view, setView] = useState({ branca: 'frente', preta: 'frente' })

  const handleComprar = () => {
    window.open('https://forms.gle/otn4kzHJEv58qLQ78', '_blank')
  }

  const handleNext = (color) => {
    setView(prev => ({ ...prev, [color]: prev[color] === 'frente' ? 'costas' : 'frente' }))
  }

  const images = {
    branca: {
      frente: '/camisetas/branca-frente.png',
      costas: '/camisetas/branca-costas.png'
    },
    preta: {
      frente: '/camisetas/preta-frente.png',
      costas: '/camisetas/preta-costas.png'
    }
  }

  const getImageUrl = (color, side) => {
    if (!images[color] || !images[color][side]) {
      return null
    }
    return images[color][side]
  }

  return (
    <div className="section">
      <h2>Camisetas do Evento</h2>
      
      <div className="camisetas-container">
        
        {/* Modelos das camisetas */}
        <div className="modelos-container">
          <h3>Modelos disponíveis</h3>
          <div className="camisetas-grid">
            
            {/* Camiseta Branca */}
            <div 
              className={`camiseta-card ${selectedColor === 'branca' ? 'selected' : ''}`}
              onClick={() => setSelectedColor('branca')}
            >
              <div className="camiseta-preview">
                <div className="image-carousel">
                  <img 
                    src={getImageUrl('branca', view.branca) || '/camisetas/branca-placeholder.svg'}
                    alt={`Camiseta Branca - ${view.branca}`}
                    className="carousel-image"
                    onError={(e) => {
                      e.target.src = '/camisetas/placeholder.svg'
                    }}
                  />
                  <button 
                    className="carousel-nav prev" 
                    onClick={(e) => { e.stopPropagation(); handleNext('branca') }}
                  >
                    ◀
                  </button>
                  <button 
                    className="carousel-nav next" 
                    onClick={(e) => { e.stopPropagation(); handleNext('branca') }}
                  >
                    ▶
                  </button>
                </div>
                <div className="carousel-indicator">
                  <span className={`dot ${view.branca === 'frente' ? 'active' : ''}`}></span>
                  <span className={`dot ${view.branca === 'costas' ? 'active' : ''}`}></span>
                </div>
              </div>
              <div className="camiseta-info">
                <h4>Camiseta Off-White</h4>
                <p>{view.branca === 'frente' ? 'Frente' : 'Costas'}</p>
              </div>
              <div className="camiseta-radio">
                <span className={`radio-dot ${selectedColor === 'branca' ? 'active' : ''}`}></span>
              </div>
            </div>

            {/* Camiseta Preta */}
            <div 
              className={`camiseta-card ${selectedColor === 'preta' ? 'selected' : ''}`}
              onClick={() => setSelectedColor('preta')}
            >
              <div className="camiseta-preview">
                <div className="image-carousel">
                  <img 
                    src={getImageUrl('preta', view.preta) || '/camisetas/preta-placeholder.svg'}
                    alt={`Camiseta Preta - ${view.preta}`}
                    className="carousel-image"
                    onError={(e) => {
                      e.target.src = '/camisetas/placeholder.svg'
                    }}
                  />
                  <button 
                    className="carousel-nav prev" 
                    onClick={(e) => { e.stopPropagation(); handleNext('preta') }}
                  >
                    ◀
                  </button>
                  <button 
                    className="carousel-nav next" 
                    onClick={(e) => { e.stopPropagation(); handleNext('preta') }}
                  >
                    ▶
                  </button>
                </div>
                <div className="carousel-indicator">
                  <span className={`dot ${view.preta === 'frente' ? 'active' : ''}`}></span>
                  <span className={`dot ${view.preta === 'costas' ? 'active' : ''}`}></span>
                </div>
              </div>
              <div className="camiseta-info">
                <h4>Camiseta Preta</h4>
                <p>{view.preta === 'frente' ? 'Frente' : 'Costas'}</p>
              </div>
              <div className="camiseta-radio">
                <span className={`radio-dot ${selectedColor === 'preta' ? 'active' : ''}`}></span>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso de pagamento via PIX */}
        <div className="aviso-pagamento">
          <p>⚠️ <strong>Atenção:</strong> Pagamentos aceitos apenas via PIX.</p>
        </div>

        {/* Preço */}
        <div className="preco-box">
          <span className="preco-label">Valor</span>
          <span className="preco-valor">R$ 55,00</span>
        </div>

        <button className="btn-primary btn-comprar" onClick={handleComprar}>
          Ir para o formulário de compra
                    <span className="btn-arrow-two">→</span>

        </button>
         

      </div>
    </div>
  )
}

export default Camisetas