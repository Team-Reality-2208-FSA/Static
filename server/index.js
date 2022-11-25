const port = process.env.PORT || 3000
const app = require('./app')
const { db } = require('./db')

// Start the database, then start the server
db.sync().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`))
})
