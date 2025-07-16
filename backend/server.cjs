const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

// Path to frontend folder and JSON database
const frontendPath = path.join(__dirname, '../frontend')
const FILE = path.join(__dirname, 'sweets.json')

// Middlewares
app.use(cors())
app.use(express.json())

// Serve frontend static files
app.use(express.static(frontendPath))

// Helpers to read/write JSON
const readData = () => {
  if (!fs.existsSync(FILE)) return []
  const data = fs.readFileSync(FILE)
  return data.length ? JSON.parse(data) : []
}

const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
}

// API Routes

// GET all sweets
app.get('/sweets', (req, res) => {
  res.json(readData())
})

// POST a new sweet
app.post('/sweets', (req, res) => {
  const sweets = readData()
  const newSweet = req.body

  if (sweets.find(s => s.id === newSweet.id)) {
    return res.status(400).json({ message: 'Sweet with this ID already exists' })
  }

  sweets.push(newSweet)
  writeData(sweets)
  res.status(201).json(newSweet)
})

// DELETE a sweet
app.delete('/sweets/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const sweets = readData()
  const updated = sweets.filter(s => s.id !== id)
  writeData(updated)
  res.json({ message: 'Deleted' })
})

// PUT to update a sweet
app.put('/sweets/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const update = req.body
  const sweets = readData()
  const index = sweets.findIndex(s => s.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Sweet not found' })
  }

  sweets[index] = { ...sweets[index], ...update }
  writeData(sweets)
  res.json(sweets[index])
})

// Fallback route to serve frontend for any unmatched path (safe)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
