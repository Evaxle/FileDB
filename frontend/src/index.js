const app = document.getElementById('app')
const home = document.getElementById('home')
const recentList = document.getElementById('recent-list')
const createPasteBtn = document.getElementById('create-paste-btn')
const uploadFileBtn = document.getElementById('upload-file-btn')

async function fetchRecent() {
  const res = await fetch('http://localhost:3000/api/pastes')
  const data = await res.json()
  recentList.innerHTML = ''
  data.forEach(item => {
    const li = document.createElement('li')
    const link = document.createElement('a')
    link.href = `/paste/${item._id}`
    link.textContent = item.title || item.filename || 'Untitled'
    li.appendChild(link)
    recentList.appendChild(li)
  })
}

function renderPasteForm() {
  app.innerHTML = `
    <section id="paste-form">
      <h2>Create New Paste</h2>
      <form id="pasteForm">
        <input type="text" name="title" placeholder="Paste Title" required>
        <select name="language">
          <option value="plaintext">Plain Text</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <textarea name="content" placeholder="Paste your code here" rows="10" required></textarea>
        <button type="submit">Create</button>
      </form>
      <button id="back-home">Back</button>
    </section>
  `
  const form = document.getElementById('pasteForm')
  form.addEventListener('submit', async e => {
    e.preventDefault()
    const formData = new FormData(form)
    const payload = {
      title: formData.get('title'),
      language: formData.get('language'),
      content: formData.get('content')
    }
    const res = await fetch('http://localhost:3000/api/paste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    if(result._id) window.location.href = `/paste/${result._id}`
  })
  document.getElementById('back-home').addEventListener('click', () => {
    renderHome()
  })
}

function renderFileUploadForm() {
  app.innerHTML = `
    <section id="file-upload-form">
      <h2>Upload File</h2>
      <form id="fileForm" enctype="multipart/form-data">
        <input type="file" name="file" required>
        <button type="submit">Upload</button>
      </form>
      <button id="back-home">Back</button>
    </section>
  `
  const form = document.getElementById('fileForm')
  form.addEventListener('submit', async e => {
    e.preventDefault()
    const formData = new FormData(form)
    const res = await fetch('http://localhost:3000/api/paste/file', {
      method: 'POST',
      body: formData
    })
    const result = await res.json()
    if(result._id) window.location.href = `/paste/${result._id}`
  })
  document.getElementById('back-home').addEventListener('click', () => {
    renderHome()
  })
}

function renderHome() {
  app.innerHTML = ''
  app.appendChild(home)
  fetchRecent()
}

createPasteBtn.addEventListener('click', () => renderPasteForm())
uploadFileBtn.addEventListener('click', () => renderFileUploadForm())

fetchRecent()