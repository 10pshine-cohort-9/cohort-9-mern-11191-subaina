import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, NotebookPen } from 'lucide-react'
import '../styles/Auth.css'

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('signup submit', form)
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
          <h1>Create your account</h1>
          <p>A calmer place to keep your notes.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field-icon-wrap">
            <User size={18} />
            <input
              className="pill-input"
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

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

          <label className="field-icon-wrap">
            <Lock size={18} />
            <input
              className="pill-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary auth-submit">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
