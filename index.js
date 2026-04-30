import app from './api/index.js'

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
