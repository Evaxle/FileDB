import React, { useState } from 'react'

export default function FileUpload({ onBack }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('http://localhost:3000/api/paste/file', {
      method: 'POST',
      body: formData
    })
    const result = await res.json()
    setUploading(false)
    if (result._id) window.location.href = `/paste/${result._id}`
  }

  return (
    <section>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <button onClick={onBack} style={{ marginTop: '1rem' }}>Back</button>
    </section>
  )
}