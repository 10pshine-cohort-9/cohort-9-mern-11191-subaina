import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import { X, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import { mockNotes } from '../mockNotes'
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

  const existingNote = useMemo(
    () => (isEditing ? mockNotes.find((note) => note.id === id) : null),
    [id, isEditing]
  )

  const [title, setTitle] = useState(existingNote?.title ?? '')
  const [content, setContent] = useState(existingNote?.content ?? '')

  function handleSave() {
    console.log('save note', { id, title, content })
    navigate('/')
  }

  return (
    <div className="editor-page">
      <Navbar />

      <main className="editor-main">
        <div className="editor-topbar">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate(-1)}
          >
            <X size={16} />
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            <Check size={16} />
            Save
          </button>
        </div>

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
