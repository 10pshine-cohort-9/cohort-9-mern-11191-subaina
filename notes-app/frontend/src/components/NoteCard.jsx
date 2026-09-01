import { useNavigate } from 'react-router-dom'
import '../styles/NoteCard.css'

function stripHtml(html) {
  return html.replace(/<[^<>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncate(text, max = 110) {
  return text.length > max ? `${text.slice(0, max).trim()}…` : text
}

function relativeTime(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.round(days / 7)
  if (weeks < 5) return `${weeks}w ago`
  const months = Math.round(days / 30)
  return `${months}mo ago`
}

function NoteCard({ id, title, content, tag, color = 'coral', updatedAt }) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="note-card"
      onClick={() => navigate(`/notes/${id}`)}
    >
      <div className="note-card-header">
        {tag && <span className={`tag tag-${color}`}>{tag}</span>}
        <span className="note-card-time">{relativeTime(updatedAt)}</span>
      </div>
      <h3 className="note-card-title">{title}</h3>
      <p className="note-card-preview">{truncate(stripHtml(content))}</p>
    </button>
  )
}

export default NoteCard
