import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, NotebookPen } from 'lucide-react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { mockNotes } from '../mockNotes'
import '../styles/Dashboard.css'

function Dashboard() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return mockNotes
    return mockNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.tag.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    )
  }, [query])

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

        {filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} {...note} />
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
