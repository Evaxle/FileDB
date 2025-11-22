import { supabase } from './supabaseClient.js'

document.addEventListener('DOMContentLoaded', () => {
  const pasteForm = document.getElementById('pasteForm')
  pasteForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = document.getElementById('pasteTitle').value
    const language = document.getElementById('pasteLanguage').value
    const content = document.getElementById('pasteContent').value

    const { data, error } = await supabase
      .from('pastes')
      .insert([{ title, language, content }])
      .select()

    if (error) {
      alert('Error creating paste: ' + error.message)
    } else if (data && data[0]?.id) {
      window.location.href = `pasteview.html?id=${data[0].id}`
    }
  })
})