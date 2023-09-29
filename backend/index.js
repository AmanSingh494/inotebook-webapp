const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()
const port = 5000

// connecting to mongo DB
connectToMongo()
app.use(cors())
app.use(express.json())
// using routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log('listening on port 5000')
})
