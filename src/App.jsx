import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import BlackholeImage from './components/BlackholeImage'
import BlackholeParticles from './components/BlackholeParticles'
import CosmicDust from './components/CosmicDust'
import BinaryFloat from './components/BinaryFloat'
import Home from './pages/Home'
import Programacao from './pages/Programacao'
import Submissoes from './pages/Submissoes'
import Camisetas from './pages/Camisetas' 
 // ← NOVA IMPORTAÇÃO

function App() {
  return (
    <BrowserRouter>
      <BlackholeImage />
      <BlackholeParticles />
      <CosmicDust />
      <BinaryFloat />
      <div className="container">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programacao" element={<Programacao />} />
          <Route path="/submissoes" element={<Submissoes />} />
          <Route path="/camisetas" element={<Camisetas />} />
        </Routes>
        <footer>
          <p>© 2026 XII Semana da Física | Unidade Acadêmica de Física - UFCG</p>
          <p>Contato: <a href="mailto:semanadafisica.uaf@gmail.com">semanadafisica.uaf@gmail.com</a></p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App