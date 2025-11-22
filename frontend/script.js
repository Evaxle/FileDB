document.getElementById('createPaste').addEventListener('click', async () => {
  const title = document.getElementById('pasteTitle').value
  const language = document.getElementById('pasteLanguage').value
  const content = document.getElementById('pasteContent').value
  if (!title || !content) return alert('Title and content cannot be empty')
  const res = await fetch('/api/paste', {
    method: 'POST',
    body: JSON.stringify({ title, content, language })
  })
  const data = await res.json()
  window.location.href = data.url
})
