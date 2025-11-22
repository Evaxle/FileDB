import { supabase } from './supabaseClient.js'

document.addEventListener('DOMContentLoaded', () => {
  const fileForm = document.getElementById('fileForm')
  fileForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('fileInput')
    if (!fileInput.files.length) return
    const file = fileInput.files[0]

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(file.name, file)

    if (uploadError) {
      alert('Upload error: ' + uploadError.message)
      return
    }

    const fileUrl = `https://qhlettphcwwdoorgxozk.supabase.co/storage/v1/object/public/uploads/${file.name}`

    const { data, error: dbError } = await supabase
      .from('pastes')
      .insert([{ filename: file.name, file_url: fileUrl }])
      .select()

    if (dbError) {
      alert('Database error: ' + dbError.message)
    } else if (data && data[0]?.id) {
      window.location.href = `pasteview.html?id=${data[0].id}`
    }
  })
})