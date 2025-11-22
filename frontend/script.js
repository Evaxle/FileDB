document.getElementById('createPaste').addEventListener('click', async () => {
  const content = document.getElementById('pasteContent').value
  if (!content) return alert('Paste cannot be empty')
  const res = await fetch('/api/paste', {
    method: 'POST',
    body: JSON.stringify({ content })
  })
  const data = await res.json()
  const link = document.createElement('a')
  link.href = data.url
  link.textContent = `View your paste: ${data.url}`
  document.getElementById('pasteLink').innerHTML = ''
  document.getElementById('pasteLink').appendChild(link)
})
