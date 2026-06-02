import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Inscricao = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    modalidade: '',
    nomeCracha: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comprovante, setComprovante] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [inscricaoRealizada, setInscricaoRealizada] = useState(false)

  // Chave PIX fixa
  const CHAVE_PIX = '11980124393'
  const NOME_RECEBEDOR = 'HELIO JOSE DE QUEIROZ NETO'

  const modalidades = [
    { value: 'graduacao', label: 'Graduação', price: 15.00 },
    { value: 'mestrado', label: 'Mestrado', price: 45.00 },
    { value: 'doutorado', label: 'Doutorado', price: 75.00 },
    { value: 'professor', label: 'Professor', price: 100.00 }
  ]

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',')
  }

  // Sanitização
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input
    return input
      .replace(/[<>]/g, '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: sanitizeInput(value) }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value)
    setFormData(prev => ({ ...prev, telefone: sanitizeInput(formatted) }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setMensagem('Formato não permitido. Use PDF, JPG ou PNG.')
        return
      }
      if (file.size > maxSize) {
        setMensagem('Arquivo muito grande. Máximo 5MB.')
        return
      }
      setComprovante(file)
      setMensagem('')
    }
  }

  const copiarChavePIX = () => {
    navigator.clipboard.writeText(CHAVE_PIX)
    setMensagem('Chave PIX copiada!')
    setTimeout(() => setMensagem(''), 3000)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório'
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório'
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Telefone inválido'
    }
    if (!formData.modalidade) newErrors.modalidade = 'Selecione uma modalidade'
    if (!formData.nomeCracha.trim()) newErrors.nomeCracha = 'Nome para o crachá é obrigatório'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    if (!comprovante) {
      setMensagem('Por favor, anexe o comprovante de pagamento.')
      return
    }

    setIsSubmitting(true)
    
    try {
      const modalidadeSelecionada = modalidades.find(m => m.value === formData.modalidade)
      
      // Preparar dados da inscrição
      const inscricaoData = {
        nome: sanitizeInput(formData.nomeCompleto),
        email: sanitizeInput(formData.email),
        telefone: sanitizeInput(formData.telefone),
        modalidade: formData.modalidade,
        modalidadeLabel: modalidadeSelecionada?.label,
        nomeCracha: sanitizeInput(formData.nomeCracha),
        valor: modalidadeSelecionada?.price,
        comprovanteNome: comprovante.name,
        dataInscricao: new Date().toISOString()
      }
      
      // TODO: Integrar com API real
      // const formDataToSend = new FormData()
      // formDataToSend.append('dados', JSON.stringify(inscricaoData))
      // formDataToSend.append('comprovante', comprovante)
      // await fetch('/api/inscricoes', { method: 'POST', body: formDataToSend })
      
      // Salvar no localStorage temporariamente
      localStorage.setItem('inscricao_realizada', JSON.stringify(inscricaoData))
      
      setInscricaoRealizada(true)
      
    } catch (error) {
      setMensagem('Erro ao processar inscrição. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Tela de sucesso
  if (inscricaoRealizada) {
    return (
      <div className="section">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Inscrição realizada com sucesso!</h2>
          <p>Sua inscrição foi registrada e o comprovante foi enviado.</p>
          <p className="info-obs">Em breve você receberá um e-mail de confirmação.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Voltar para o site
          </button>
        </div>
      </div>
    )
  }

  const modalidadeSelecionada = modalidades.find(m => m.value === formData.modalidade)

  return (
    <div className="section">
      <div className="inscricao-header">
        <button className="btn-voltar" onClick={() => navigate('/')}>← Voltar</button>
        <h2>Inscrição - XII Semana da Física</h2>
      </div>

      {/* Tabela de valores */}
      <div className="valores-tabela">
        <h3>Valores por modalidade</h3>
        <table className="valores-table">
          <thead>
            <tr>
              <th>Modalidade</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {modalidades.map(mod => (
              <tr key={mod.value}>
                <td>{mod.label}</td>
                <td>R$ {formatPrice(mod.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Informações PIX */}
      <div className="pix-info-box">
        <h3>Pagamento via PIX</h3>
        <div className="pix-dados">
          <p><strong>Recebedor:</strong> {NOME_RECEBEDOR}</p>
          <p><strong>Chave PIX:</strong> {CHAVE_PIX}</p>
          {modalidadeSelecionada && (
            <p><strong>Valor a pagar:</strong> R$ {formatPrice(modalidadeSelecionada.price)}</p>
          )}
        </div>
        
        <button className="btn-copiar-pix" onClick={copiarChavePIX}>
          📋 Copiar chave PIX
        </button>
        
        <div className="instrucoes-pix">
          <p><strong>Como pagar:</strong></p>
          <ol>
            <li>Abra o aplicativo do seu banco</li>
            <li>Escolha a opção PIX</li>
            <li>Selecione "Pagar com chave"</li>
            <li>Cole a chave: <strong>{CHAVE_PIX}</strong></li>
            <li>Digite o valor correspondente à sua modalidade</li>
            <li>Confirme o pagamento</li>
          </ol>
        </div>
      </div>

      {/* Formulário de inscrição */}
      <form onSubmit={handleSubmit}>
        <h3>Dados da inscrição</h3>
        
        <div className="form-group">
          <label>Nome completo *</label>
          <input 
            type="text" 
            name="nomeCompleto" 
            value={formData.nomeCompleto} 
            onChange={handleChange} 
            className={errors.nomeCompleto ? 'error' : ''}
            placeholder="Digite seu nome completo"
            maxLength="100"
          />
          {errors.nomeCompleto && <span className="error-msg">{errors.nomeCompleto}</span>}
        </div>

        <div className="form-group">
          <label>E-mail *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={errors.email ? 'error' : ''}
            placeholder="seuemail@exemplo.com"
            maxLength="100"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Telefone (com DDD) *</label>
          <input 
            type="tel" 
            name="telefone" 
            value={formData.telefone} 
            onChange={handleTelefoneChange} 
            placeholder="(83) 91234-5678"
            className={errors.telefone ? 'error' : ''}
          />
          {errors.telefone && <span className="error-msg">{errors.telefone}</span>}
        </div>

        <div className="form-group">
          <label>Modalidade *</label>
          <select 
            name="modalidade" 
            value={formData.modalidade} 
            onChange={handleChange} 
            className={errors.modalidade ? 'error' : ''}
          >
            <option value="">Selecione uma modalidade</option>
            {modalidades.map(mod => (
              <option key={mod.value} value={mod.value}>
                {mod.label}
              </option>
            ))}
          </select>
          {errors.modalidade && <span className="error-msg">{errors.modalidade}</span>}
        </div>

        <div className="form-group">
          <label>Nome para o crachá *</label>
          <input 
            type="text" 
            name="nomeCracha" 
            value={formData.nomeCracha} 
            onChange={handleChange} 
            className={errors.nomeCracha ? 'error' : ''}
            placeholder="Ex: João, Prof. Carlos, Dra. Maria"
            maxLength="50"
          />
          {errors.nomeCracha && <span className="error-msg">{errors.nomeCracha}</span>}
        </div>

        <div className="form-group">
          <label>Comprovante de pagamento *</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="comprovante"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png,.jpeg"
            />
            <label htmlFor="comprovante" className="file-input-label">
               {comprovante ? comprovante.name : 'Selecionar comprovante'}
            </label>
          </div>
          <p className="form-hint">PDF, JPG ou PNG - máximo 5MB</p>
        </div>

        {mensagem && <p className="error-msg" style={{ textAlign: 'center' }}>{mensagem}</p>}

        <div className="form-buttons">
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Realizar inscrição'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Inscricao