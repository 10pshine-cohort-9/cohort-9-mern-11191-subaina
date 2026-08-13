import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, NotebookPen } from 'lucide-react'
import '../styles/Auth.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('login submit', form)
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

          <button type="submit" className="btn btn-primary auth-submit">
            Log in
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
