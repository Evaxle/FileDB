import Paste from '../models/Paste.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'

export const createPaste = async (req, res) => {
  try {
    const { title, language, content } = req.body
    const paste = new Paste({ title, language, content, urlId: uuidv4() })
    await paste.save()
    res.json(paste)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const file = req.file
    const paste = new Paste({
      filename: file.originalname,
      fileUrl: `/uploads/${file.filename}`,
      urlId: uuidv4()
    })
    await paste.save()
    res.json(paste)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getPaste = async (req, res) => {
  try {
    const paste = await Paste.findOne({ urlId: req.params.id })
    if (!paste) return res.status(404).json({ error: 'Paste not found' })
    res.json(paste)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getRecentPastes = async (req, res) => {
  try {
    const pastes = await Paste.find().sort({ createdAt: -1 }).limit(20)
    res.json(pastes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
