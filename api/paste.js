let pastes = {}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = JSON.parse(req.body)
    const id = Math.random().toString(36).substr(2, 8)
    pastes[id] = { content, createdAt: new Date() }
    res.status(200).json({ id, url: `/pasteview.html?id=${id}` })
  } else if (req.method === 'GET') {
    const { id } = req.query
    const paste = pastes[id]
    if (!paste) return res.status(404).json({ error: 'Paste not found' })
    res.status(200).json(paste)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
