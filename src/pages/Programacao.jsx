 import { useState } from 'react'

// Local das palestras
const palestras = 'Centro de Extensão José Farias Nóbrega'

// Dados da programacao
const scheduleData = {
  1: [
    { time: '08:00 - 08:30', title: 'Abertura', speaker: 'A confirmar', location: palestras },
    { time: '08:40 - 09:30', title: 'A confirmar', speaker: 'Prof. Dr. Leandro Balby', location: palestras },
    { time: '09:30 - 10:20', title: 'O Desenvolvimento de Satelites no INPE e o Subsistema de Controle de Atitude', speaker: 'Dr. Ronan Arraes', location: palestras },
    { time: '10:20 - 10:40', title: 'Coffee Break', speaker: 'A confirmar', location: palestras },
    { time: '10:40 - 11:20', title: 'A Travessia Tecnologica da Humanidade: da Tradição a Cibercultura na Era da Educacao 5.0', speaker: 'Prof. Dr. Gustavo de Alencar', location: palestras },
    { time: '11:20 - 12:00', title: 'Mesa Redonda', speaker: 'A confirmar', location: palestras },
    { time: '14:00 - 16:00', title: 'MINICURSOS', speaker: 'Inscrições abertas', location: 'Unidade Acadêmica de Física - Bloco CY' },
  ],
  2: [
    { time: '08:00 - 08:40', title: 'Eclipses Solares na Atmosfera', speaker: 'Prof. Dr. Igo Paulino', location: palestras },
    { time: '08:40 - 09:20', title: '70 Anos da Primeira Detecção dos Neutrinos', speaker: 'Prof. Dr. Diego Cogollo', location: palestras },
    { time: '09:20 - 10:00', title: 'Entre Ondas e Partículas: História, Controvérsias e a Construção da Física Quântica', speaker: 'Prof. Dr. Marcos Barros', location: palestras },
    { time: '10:00 - 10:20', title: 'Coffee Break & Apresentação de Pôsteres', speaker: ' ', location: palestras },
    { time: '10:20 - 11:00', title: 'Óptica Não Linear e Fotônica Quântica em Sistemas Experimentais: Caracterização de χ³ em Materiais 2D e Geração de Pares Fótons Emaranhados', speaker: 'Prof. Alyson Carvalho', location: palestras },
    { time: '11:00 - 12:00', title: 'Apresentações Orais dos Alunos', speaker: '  ', location: palestras },
    { time: '14:00 - 16:00', title: 'MINICURSOS', speaker: 'Inscriçôes abertas', location: 'Unidade Acadêmica de Física - Bloco CY' },
  ],
  3: [
    { time: '08:00 - 08:40', title: 'Cosmologia com Fast Radio Bursts', speaker: 'Dra. Thaís Lemos', location: palestras },
    { time: '08:40 - 09:20', title: 'Cristais Orgânicos Não Porosos: O Futuro da Captura de CO2?', speaker: 'Prof. Dr. Rodrigo Lima', location: palestras },
    { time: '09:20 - 10:00', title: 'A confirmar', speaker: 'Prof. Dr. Thiago Massoni', location: palestras },
    { time: '10:00 - 10:20', title: 'Coffee Break & Apresentação de Pôsteres', speaker: ' ', location: palestras },
    { time: '10:20 - 11:00', title: 'A confirmar', speaker: 'A confirmar', location: palestras},
    { time: '11:00 - 12:00', title: 'Apresentações Orais dos Alunos', speaker: '  ', location: palestras },
    { time: '14:00 - 16:00', title: 'OFICINAS', speaker: 'Inscrições abertas', location: 'Unidade Acadêmica de Física - Bloco CY' },
    { time: '16:00 - 17:00', title: 'Encerramento', speaker: 'Profa. Dra. Daisy Martins', location: "Auditório Junger Precker - Unidade Acadêmica de Física, Bloco CY" },
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

  return (
    <div className="section programacao-section">
      <h2>Programação</h2>
      
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

              return (
                <tr key={idx} style={isHighlight ? { 
                  background: 'rgba(94, 26, 143, 0.25)',
                  borderLeft: '3px solid #b87cff',
                  fontWeight: '600'
                } : {}}>
                  <td className="time-col" style={isHighlight ? { color: '#b87cff' } : {}}>{item.time}</td>
                  <td className="title-col" style={isHighlight ? { color: '#e0b0ff' } : {}}>{item.title}</td>
                  <td className="speaker-col" style={isHighlight ? { color: '#c48bff' } : {}}>{item.speaker}</td>
                  <td className="location-col" style={isHighlight ? { color: '#b87cff' } : {}}>{item.location}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      <p className="info-obs programacao-info italic" style={{ marginTop: '30px', textAlign: 'center' }}>
        Programação sujeita a alterações
      </p>
    </div>
  )
}

export default Programacao