import React from 'react'
import { supabase } from './supabaseClient'

export default function PasteView({ paste, onBack }) {
  if (!paste) {
    return (
      <section>
        <p>Paste not found.</p>
        <button onClick={onBack}>Back</button>
      </section>
    )
  }

  return (
    <section className="paste-container">
      <div className="paste-header">
        <h2>{paste.title || paste.filename || 'Untitled'}</h2>
        {paste.filename && (
          <a href={paste.fileUrl} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        )}
      </div>
      {paste.content && (
        <div className="paste-content">
          <code>{paste.content}</code>
        </div>
      )}
      <button className="back-btn" onClick={onBack}>Back</button>
    </section>
  )
}