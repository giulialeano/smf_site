import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const pages = [
    { path: '/', label: 'Início' },
    { path: '/programacao', label: 'Programação' },
    { path: '/submissoes', label: 'Submissões' },
    { path: '/camisetas', label: 'Camisetas' }   // ← NOVA ABA
  ]

  return (
    <nav className="nav-links">
      {pages.map(page => (
        <NavLink
          key={page.path}
          to={page.path}
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
        >
          {page.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation