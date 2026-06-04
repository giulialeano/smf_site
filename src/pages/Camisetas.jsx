const Camisetas = () => {
  const handleComprar = () => {
    window.open('https://forms.gle/otn4kzHJEv58qLQ78', '_blank')
  }

  return (
    <div className="section">
      <h2>Camisetas do Evento</h2>
      
      <div className="camisetas-container">
        <div className="camiseta-info">
          <p>Adquira a camiseta oficial da XII Semana da Física!</p>
          <p className="camiseta-preco"><strong>Valor: R$ 55,00</strong></p>
        </div>
        <button className="btn-primary btn-comprar" onClick={handleComprar}>
          🛒 Ir para o formulário de compra
        </button>
      </div>
    </div>
  )
}

export default Camisetas