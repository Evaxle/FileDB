import express from 'express'
import { createPaste, createFile, getPaste, getRecentPastes } from '../controllers/pasteController.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.post('/paste', createPaste)
router.post('/paste/file', upload.single('file'), createFile)
router.get('/paste/:id', getPaste)
router.get('/pastes', getRecentPastes)

export default router