import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotebookPen, ChevronDown, User, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import '../styles/Navbar.css'

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    setMenuOpen(false)
    await logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <NotebookPen size={20} strokeWidth={2} />
        <span>Notes</span>
      </Link>

      <div className="navbar-right" ref={menuRef}>
        <button
          type="button"
          className="navbar-avatar-btn"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-avatar">{getInitials(user.name)}</span>
          <ChevronDown size={16} />
        </button>

        {menuOpen && (
          <div className="navbar-dropdown">
            <div className="navbar-dropdown-user">
              <span className="navbar-dropdown-name">{user.name}</span>
              <span className="navbar-dropdown-email">{user.email}</span>
            </div>
            <Link
              to="/profile"
              className="navbar-dropdown-item"
              onClick={() => setMenuOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>
            <button
              type="button"
              className="navbar-dropdown-item"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
