import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const pages = [
    { path: '/', label: 'Início' },
    { path: '/programacao', label: 'Programação' },
    { path: '/submissoes', label: 'Submissões' }
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