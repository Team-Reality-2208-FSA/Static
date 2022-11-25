// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const Sequelize = require('sequelize')
const pkg = require('../../package.json')

// The name of the DB is the same as the package name "final-project"
const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false,
})

module.exports = db
