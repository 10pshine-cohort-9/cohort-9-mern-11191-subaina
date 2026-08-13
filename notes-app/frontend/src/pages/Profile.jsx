import { useNavigate } from 'react-router-dom'
import { LogOut, NotebookText, CalendarDays } from 'lucide-react'
import Navbar from '../components/Navbar'
import '../styles/Profile.css'

const mockUser = {
  name: 'Subaina Monib',
  email: 'subaina@example.com',
  notesCreated: 12,
  memberSince: 'Jan 2026',
}

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Profile() {
  const navigate = useNavigate()

  return (
    <div className="profile-page">
      <Navbar />
      <div className="bg-blob-accent" />

      <main className="profile-main">
        <div className="glass-card profile-card">
          <div className="profile-avatar">{getInitials(mockUser.name)}</div>
          <h1>{mockUser.name}</h1>
          <p className="profile-email">{mockUser.email}</p>

          <div className="profile-stats">
            <span className="stat-pill">
              <NotebookText size={14} />
              {mockUser.notesCreated} notes created
            </span>
            <span className="stat-pill">
              <CalendarDays size={14} />
              Member since {mockUser.memberSince}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/login')}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </main>
    </div>
  )
}

export default Profile
