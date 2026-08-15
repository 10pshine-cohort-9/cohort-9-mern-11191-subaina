import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, NotebookPen } from 'lucide-react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { getNotes } from '../api/noteApi'
import '../styles/Dashboard.css'

function Dashboard() {
  const [query, setQuery] = useState('')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadNotes()
  }, [])

  async function loadNotes() {
    setLoading(true)
    setError('')

    try {
      const data = await getNotes()
      setNotes(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return notes
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)
    )
  }, [query, notes])

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="bg-blob-accent" />

      <main className="dashboard-main">
        <div className="dashboard-toolbar">
          <label className="field-icon-wrap dashboard-search">
            <Search size={18} />
            <input
              className="pill-input"
              type="text"
              placeholder="Search notes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/notes/new')}
          >
            <Plus size={18} />
            New Note
          </button>
        </div>

        {loading ? (
          <p>Loading notes...</p>
        ) : error ? (
          <div className="empty-state">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button type="button" className="btn btn-primary" onClick={loadNotes}>
              Retry
            </button>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                updatedAt={note.updatedAt}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <NotebookPen size={32} />
            </div>
            <h2>No notes found</h2>
            <p>
              {query
                ? `Nothing matches "${query}". Try a different search.`
                : 'Start capturing your thoughts — create your first note.'}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/notes/new')}
            >
              <Plus size={18} />
              New Note
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
