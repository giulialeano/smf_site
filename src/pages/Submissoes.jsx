const Submissoes = () => {
  const handleFormulario = () => {
    window.open('https://forms.gle/E6rLBynPcSGXwNQJA', '_blank')
  }

  return (
    <div className="section">
      <h2>Submissão de Trabalhos</h2>
      
      <div className="submissoes-container">
        
        {/* Card principal com todas as informações */}
        <div className="submissoes-card">
          
          {/* Inscrição obrigatória */}
          <div className="submissoes-item">
            <h3>Inscrição no evento</h3>
            <p>A inscrição no evento é obrigatória para submeter trabalhos. Os dados informados serão cruzados com o sistema de inscrições.</p>
          </div>

          {/* Regra de submissão */}
          <div className="submissoes-item">
            <h3>Autoria</h3>
            <p>Apenas um autor por trabalho precisa realizar a submissão. Todos os autores devem estar devidamente inscritos no evento.</p>
          </div>

          {/* Formato do resumo */}
          <div className="submissoes-item">
            <h3>Formato do resumo</h3>
            <p>O resumo deve ter no máximo <strong>2500 caracteres</strong>. Utilize os modelos disponíveis no formulário de submissão para garantir a formatação correta.</p>
          </div>

          {/* Prazo */}
          <div className="submissoes-item destaque">
            <h3>Prazo final</h3>
            <p className="prazo-data">21 de junho de 2026</p>
            <p>Submissões realizadas após esta data não serão aceitas.</p>
          </div>

          {/* Contato */}
          <div className="submissoes-item contato">
            <h3>Dúvidas</h3>
            <p>Entre em contato pelo e-mail: <a href="mailto:semanadafisica.uaf@gmail.com">semanadafisica.uaf@gmail.com</a></p>
          </div>

        </div>

        {/* Botão */}
        <button className="btn-primary btn-submeter" onClick={handleFormulario}>
          Acessar formulário de submissão <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}

export default Submissoes