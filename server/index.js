const port = process.env.PORT || 3000
const app = require('./app')


// Start the database, then start the server

  app.listen(port, () => console.log(`listening on port ${port}`))

