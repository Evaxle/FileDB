import React, { useState } from 'react'
import { supabase } from './supabaseClient'

export default function FileUpload({ onBack }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setUploading(true)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(file.name, file)

    if (uploadError) {
      console.error(uploadError)
      setUploading(false)
      return
    }

    const fileUrl = `${supabase.storageUrl}/object/public/uploads/${file.name}`

    const { data, error: dbError } = await supabase
      .from('pastes')
      .insert([{ filename: file.name, file_url: fileUrl }])
      .select()

    setUploading(false)

    if (dbError) {
      console.error(dbError)
    } else if (data && data[0]?.id) {
      window.location.href = `/paste/${data[0].id}`
    }
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
