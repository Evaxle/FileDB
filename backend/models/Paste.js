import mongoose from 'mongoose'

const pasteSchema = new mongoose.Schema({
  title: { type: String },
  language: { type: String, default: 'plaintext' },
  content: { type: String },
  filename: { type: String },
  fileUrl: { type: String },
  urlId: { type: String, required: true, unique: true },
}, { timestamps: true })

export default mongoose.model('Paste', pasteSchema)