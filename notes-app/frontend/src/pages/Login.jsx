import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, NotebookPen } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getErrorMessage } from '../utils/getErrorMessage'
import '../styles/Auth.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login({ email: form.email, password: form.password })
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err, 'Login failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="bg-blob-accent" />
      <div className="glass-card auth-card">
        <div className="auth-brand">
          <NotebookPen size={22} />
          <span>Notes</span>
        </div>

        <div className="auth-heading">
          <h1>Welcome back</h1>
          <p>Log in to keep writing where you left off.</p>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field-icon-wrap">
            <Mail size={18} />
            <input
              className="pill-input"
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field-icon-wrap">
            <Lock size={18} />
            <input
              className="pill-input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
