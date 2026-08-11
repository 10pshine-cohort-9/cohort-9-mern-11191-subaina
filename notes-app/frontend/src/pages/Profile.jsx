import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import '../styles/Profile.css'

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="bg-blob-accent" />

      <main className="profile-main">
        <div className="glass-card profile-card">
          <div className="profile-avatar">{getInitials(user.name)}</div>
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>

          <button type="button" className="btn btn-outline" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </main>
    </div>
  )
}

export default Profile
