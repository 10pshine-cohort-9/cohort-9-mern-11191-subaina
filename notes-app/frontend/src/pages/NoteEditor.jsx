import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import { X, Check, Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import { getNoteById, createNote, updateNote, deleteNote } from '../api/noteApi'
import 'react-quill-new/dist/quill.snow.css'
import '../styles/NoteEditor.css'

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'link'],
    ['clean'],
  ],
}

function NoteEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(isEditing)
  const [notFound, setNotFound] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return

    async function loadNote() {
      setLoading(true)
      setNotFound(false)

      try {
        const note = await getNoteById(id)
        setTitle(note.title)
        setContent(note.content)
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true)
        } else {
          setError(err.response?.data?.message || 'Failed to load note.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadNote()
  }, [id, isEditing])

  async function handleSave() {
    setError('')
    setSaving(true)

    try {
      if (isEditing) {
        await updateNote(id, { title, content })
      } else {
        await createNote({ title, content })
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save note. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this note? This cannot be undone.')) return

    setError('')
    setDeleting(true)

    try {
      await deleteNote(id)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note. Please try again.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="editor-page">
        <Navbar />
        <main className="editor-main">
          <p>Loading note...</p>
        </main>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="editor-page">
        <Navbar />
        <main className="editor-main">
          <p>Note not found.</p>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
            <X size={16} />
            Back
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="editor-page">
      <Navbar />

      <main className="editor-main">
        <div className="editor-topbar">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/')}
          >
            <X size={16} />
            Cancel
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 size={16} />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            <Check size={16} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div className="editor-card glass-card">
          <input
            className="editor-title-input"
            type="text"
            placeholder="Untitled note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <ReactQuill
            key={id ?? 'new'}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={quillModules}
            placeholder="Start writing..."
            className="editor-quill"
          />
        </div>
      </main>
    </div>
  )
}

export default NoteEditor
