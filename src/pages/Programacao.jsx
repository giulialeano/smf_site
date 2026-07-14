import { useState } from 'react'

// Local das palestras
const palestras = 'Centro de Extensão José Farias Nóbrega'

// Dados da programacao
const scheduleData = {
  1: [
    { time: '07:30', title: 'Credenciamento', location: palestras },
    { time: '08:00 - 08:30', title: 'Abertura do evento', location: palestras },
    { time: '08:40 - 09:30', title: 'IA não é o problema. Somos nós.', speaker: 'Prof. Dr. Leandro Balby', location: palestras },
    { time: '09:30 - 10:20', title: 'A Travessia Tecnologica da Humanidade: da Tradição a Cibercultura na Era da Educacao 5.0', speaker: 'Prof. Dr. Gustavo de Alencar', location: palestras },
    { time: '10:20 - 10:40', title: 'Coffee Break', speaker: 'A confirmar', location: palestras },
    { time: '10:40 - 12:00', title: 'Mesa Redonda:', speaker: 'Prof. Marcos Barros', location: palestras },
    { time: '14:00 - 16:00', title: 'MINICURSOS', speaker: 'Inscrições abertas', location: 'Unidade Acadêmica de Física - Bloco CY' },
  ],
  2: [
    { time: '08:00 - 08:40', title: 'Eclipses Solares na Atmosfera', speaker: 'Prof. Dr. Igo Paulino', location: palestras },
    { time: '08:40 - 09:20', title: '70 Anos da Primeira Detecção dos Neutrinos', speaker: 'Prof. Dr. Diego Cogollo', location: palestras },
    { time: '09:20 - 10:00', title: 'Entre Ondas e Partículas: História, Controvérsias e a Construção da Física Quântica', speaker: 'Prof. Dr. Marcos Barros', location: palestras },
    { time: '10:00 - 10:20', title: 'Coffee Break & Apresentação de Pôsteres', speaker: ' ', location: palestras },
    { time: '10:20 - 11:00', title: 'Óptica Não Linear e Fotônica Quântica em Sistemas Experimentais: Caracterização de χ³ em Materiais 2D e Geração de Pares Fótons Emaranhados', speaker: 'Prof.', location: palestras },
    { time: '11:00 - 12:30', title: 'Apresentações Orais dos Alunos', speaker: '  ', location: palestras },
    { time: '14:00 - 16:00', title: 'MINICURSOS', speaker: 'Inscriçôes abertas', location: 'Unidade Acadêmica de Física - Bloco CY' },
  ],
  3: [
    { time: '08:00 - 08:40', title: 'Cosmologia com Fast Radio Bursts', speaker: 'Dra. Thaís Lemos', location: palestras },
    { time: '08:40 - 09:20', title: 'Cristais Orgânicos Não Porosos: O Futuro da Captura de CO2?', speaker: 'Prof. Dr. Rodrigo Lima', location: palestras },
    { time: '09:20 - 10:00', title: 'A confirmar', speaker: 'Prof. Dr. Thiago Massoni', location: palestras },
    { time: '10:00 - 10:20', title: 'Coffee Break & Apresentação de Pôsteres', speaker: ' ', location: palestras },
    { time: '10:20 - 11:00', title: 'A confirmar', speaker: 'A confirmar', location: palestras},
    { time: '11:00 - 12:30', title: 'Apresentações Orais dos Alunos', speaker: '  ', location: palestras },
    { time: '14:00 - 16:00', title: 'OFICINAS', speaker: 'Inscrições abertas', location: 'Unidade Acadêmica de Física - Bloco CY' },
    { time: '16:00 - 17:00', title: 'Encerramento', speaker: 'Profa. Dra. Daisy Martins', location: palestras },
  ]
}

const Programacao = () => {
  const [activeDay, setActiveDay] = useState(1)

  const days = [
    { id: 1, label: 'Terca - 14/07' },
    { id: 2, label: 'Quarta - 15/07' },
    { id: 3, label: 'Quinta - 16/07' }
  ]

  const data = scheduleData[activeDay]

  const isHighlightRow = (title) => {
    return title === 'MINICURSOS' || title === 'OFICINAS'
  }

  // Função para abrir o formulário correto
  const handleOpenForm = (title) => {
    if (title === 'MINICURSOS') {
      window.open('https://forms.gle/heoS9nudbbpYjYMP9', '_blank')
    } else if (title === 'OFICINAS') {
      window.open('https://forms.gle/5JGKWiFD51F3zqiX9', '_blank')
    }
  }

  return (
    <div className="section programacao-section">
      <h2>Programacao</h2>
      
      <div className="day-buttons">
        {days.map(day => (
          <button 
            key={day.id} 
            className={`btn-day ${activeDay === day.id ? 'active' : ''}`} 
            onClick={() => setActiveDay(day.id)}
          >
            {day.label}
          </button>
        ))}
      </div>
      
      {/* Tabela principal */}
      <div className="table-wrapper">
        <table className="schedule-table programacao-table">
          <thead>
            <tr>
              <th>Horário</th>
              <th>Palestra</th>
              <th>Palestrante</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              const isHighlight = isHighlightRow(item.title)
              const isMinicursos = item.title === 'MINICURSOS'
              const isOficinas = item.title === 'OFICINAS'

              return (
                <tr key={idx} style={isHighlight ? { 
                  background: 'rgba(94, 26, 143, 0.25)',
                  borderLeft: '3px solid #b87cff',
                  fontWeight: '600'
                } : {}}>
                  <td className="time-col" style={isHighlight ? { color: '#b87cff' } : {}}>{item.time}</td>
                  <td className="title-col" style={isHighlight ? { color: '#e0b0ff' } : {}}>
                    {item.title}
                    {(isMinicursos || isOficinas) && (
                      <button
                        onClick={() => handleOpenForm(item.title)}
                        style={{
                          marginLeft: '12px',
                          fontSize: '0.65rem',
                          background: 'transparent',
                          border: '1px solid rgba(184, 124, 255, 0.3)',
                          color: '#b87cff',
                          padding: '3px 12px',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontFamily: 'Space Grotesk, monospace',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          letterSpacing: '0.5px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(184, 124, 255, 0.15)'
                          e.target.style.borderColor = '#b87cff'
                          e.target.style.transform = 'scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent'
                          e.target.style.borderColor = 'rgba(184, 124, 255, 0.3)'
                          e.target.style.transform = 'scale(1)'
                        }}
                      >
                        Inscrever-se
                      </button>
                    )}
                  </td>
                  <td className="speaker-col" style={isHighlight ? { color: '#c48bff' } : {}}>{item.speaker}</td>
                  <td className="location-col" style={isHighlight ? { color: '#b87cff' } : {}}>{item.location}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      <p className="info-obs programacao-info italic" style={{ marginTop: '30px', textAlign: 'center' }}>
        Programacao sujeita a alteracoes
      </p>
    </div>
  )
}

export default Programacao