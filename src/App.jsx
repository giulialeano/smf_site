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
import Inscricao from './pages/Inscricao'
import Login from './pages/Login'

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
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <footer>
          <p>© 2026 12ª Semana da Física | Unidade Acadêmica de Física - UFCG</p>
          <p>Contato: <a href="mailto:semanadafisica.uaf@gmail.com">semanadafisica.uaf@gmail.com</a></p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App