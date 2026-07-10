import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d{0,3})/, '$1.$2')
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      alert('Área do participante em desenvolvimento. Em breve você poderá acessar seus minicursos, submissões e camisetas.')
      navigate('/')
    } catch (error) {
      alert('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <h2>Área do Participante</h2>
      <p>Acesse sua conta para visualizar minicursos, submissões e camisetas.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail cadastrado *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>CPF *</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} placeholder="000.000.000-00" required maxLength="14" />
        </div>
        <div className="form-buttons">
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Voltar</button>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Entrando...' : 'Acessar área restrita'}</button>
        </div>
      </form>
      <p className="info-obs" style={{ marginTop: '20px' }}>Apenas participantes já inscritos podem acessar esta área.</p>
    </div>
  )
}

export default Login