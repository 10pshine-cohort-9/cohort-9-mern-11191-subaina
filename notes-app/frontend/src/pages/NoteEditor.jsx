import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import { X, Check, Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import { getNoteById, createNote, updateNote } from '../api/noteApi'
import { getErrorMessage } from '../utils/getErrorMessage'
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
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return

    let cancelled = false

    getNoteById(id)
      .then((note) => {
        if (cancelled) return
        setTitle(note.title)
        setContent(note.content)
      })
      .catch((err) => {
        if (cancelled) return
        setError(getErrorMessage(err, 'Failed to load note.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, isEditing])

  async function handleSave() {
    setSaving(true)
    setError('')

    try {
      if (isEditing) {
        await updateNote(id, { title, content })
      } else {
        await createNote({ title, content })
      }
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to save note. Please try again.'))
      setSaving(false)
    }
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || loading}
          >
            <Check size={16} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div className="editor-card glass-card">
          {loading ? (
            <p>Loading note...</p>
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default NoteEditor
