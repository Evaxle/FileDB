import React, { useState } from 'react'
import { supabase } from './supabaseClient'

export default function PasteForm({ onBack }) {
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('plaintext')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const { data, error } = await supabase
      .from('pastes')
      .insert([{ title, language, content }])
      .select()
    setSubmitting(false)
    if (error) {
      console.error(error)
    } else if (data && data[0]?.id) {
      window.location.href = `/paste/${data[0].id}`
    }
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
