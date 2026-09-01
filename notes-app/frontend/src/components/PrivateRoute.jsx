import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}

function PrivateRoute({ children }) {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export function GuestRoute({ children }) {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute
