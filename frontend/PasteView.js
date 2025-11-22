import { supabase } from './supabaseClient.js'

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  if (!id) return

  const { data, error } = await supabase
    .from('pastes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    document.getElementById('pasteView').textContent = 'Paste not found.'
    return
  }

  document.getElementById('pasteTitleView').textContent = data.title || data.filename || 'Untitled'
  document.getElementById('pasteContentView').textContent = data.content || ''
  const fileLink = document.getElementById('fileLink')
  if (data.file_url) {
    fileLink.href = data.file_url
    fileLink.style.display = 'inline'
  } else {
    fileLink.style.display = 'none'
  }
})