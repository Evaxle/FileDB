import React, { useState } from 'react'

export default function PasteForm({ onBack }) {
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('plaintext')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const payload = { title, language, content }
    const res = await fetch('http://localhost:3000/api/paste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    setSubmitting(false)
    if (result._id) window.location.href = `/paste/${result._id}`
  }

  return (
    <section>
      <h2>Create New Paste</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="plaintext">Plain Text</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <textarea
          rows="10"
          placeholder="Paste your code here"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Paste'}
        </button>
      </form>
      <button onClick={onBack} style={{ marginTop: '1rem' }}>Back</button>
    </section>
  )
}