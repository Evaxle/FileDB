import React, { useState, useEffect } from 'react'
import PasteForm from './components/PasteForm'
import PasteView from './components/PasteView'
import FileUpload from './components/FileUpload'

export default function App() {
  const [view, setView] = useState('home')
  const [recent, setRecent] = useState([])
  const [selectedPaste, setSelectedPaste] = useState(null)

  useEffect(() => {
    fetchRecent()
  }, [])

  async function fetchRecent() {
    const res = await fetch('http://localhost:3000/api/pastes')
    const data = await res.json()
    setRecent(data)
  }

  function handleViewPaste(paste) {
    setSelectedPaste(paste)
    setView('pasteView')
  }

  function renderHome() {
    return (
      <section>
        <h2>Welcome to fileDB</h2>
        <div>
          <button onClick={() => setView('pasteForm')}>Create Paste</button>
          <button onClick={() => setView('fileUpload')}>Upload File</button>
        </div>
        <section>
          <h3>Recent Pastes & Files</h3>
          <ul>
            {recent.map(item => (
              <li key={item._id}>
                <a href="#" onClick={() => handleViewPaste(item)}>
                  {item.title || item.filename || 'Untitled'}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    )
  }

  function renderView() {
    switch(view) {
      case 'pasteForm':
        return <PasteForm onBack={() => setView('home')} />
      case 'fileUpload':
        return <FileUpload onBack={() => setView('home')} />
      case 'pasteView':
        return <PasteView paste={selectedPaste} onBack={() => setView('home')} />
      default:
        return renderHome()
    }
  }

  return (
    <div className="app">
      <header>
        <h1>fileDB</h1>
      </header>
      <main>
        {renderView()}
      </main>
      <footer>
        <p>&copy; 2025 fileDB</p>
      </footer>
    </div>
  )
}