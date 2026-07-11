import { useState } from 'react'

// Dados da programação (serão preenchidos depois)
const scheduleData = {
  1: [],   // Dia 1 - 14/07
  2: [],   // Dia 2 - 15/07
  3: []    // Dia 3 - 16/07
}

const Programacao = () => {
  const [activeDay, setActiveDay] = useState(1)

  const days = [
    { id: 1, label: 'Dia 1 - 14/07' },
    { id: 2, label: 'Dia 2 - 15/07' },
    { id: 3, label: 'Dia 3 - 16/07' }
  ]

  const data = scheduleData[activeDay]

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
      
      {!data || data.length === 0 ? (
        <div className="aviso-breve programacao-aviso">
          <p>Em breve, divulgaremos a grade completa de palestras e atividades.</p>
          <p className="aviso-destaque">Acompanhe nossas atualizações!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="schedule-table programacao-table">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Atividade / Palestra</th>
                <th>Palestrante</th>
                <th>Local</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td className="time-col">{item.time}</td>
                  <td className="title-col">{item.title}</td>
                  <td className="speaker-col">{item.speaker}</td>
                  <td className="location-col">{item.location || 'Auditório Principal'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <p className="info-obs programacao-info italic">Programação sujeita a alterações</p>
    </div>
  )
}

export default Programacao
