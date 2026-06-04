import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleInscricao = () => {
    // Abrir o Google Forms em uma nova aba
    window.open('https://forms.gle/jpirwRAi4jHMGduk6', '_blank')
  }

  return (
    <header className="hero">
      <h1 className="glitch-text">XII SEMANA DA FÍSICA</h1>
      
      <div className="theme-card">
        <p className="theme-text"><strong>Horizontes da Ciência: Da pesquisa tradicional às ferramentas de Inteligência Artificial</strong></p>
      </div>
      
      <div className="event-details">
        <div className="event-info">
          <span>UFCG - Campus Sede - Campina Grande - PB</span>
          <span>Centro de Extensão José Farias Nóbrega</span>
          <span>14, 15 e 16 de Julho de 2026</span>
        </div>
      </div>
      
      <button className="btn-inscricao-hero" onClick={handleInscricao}>
        Inscreva-se
      </button>
    </header>
  )
}

export default Header