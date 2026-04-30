import express from 'express'
import app from './api/index.js'

const PORT = process.env.PORT || 5050

void express

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
