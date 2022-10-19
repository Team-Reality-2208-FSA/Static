// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:
const Sequelize  = require("sequelize")
const db = require('./database')
const students = require('./Students')
const Campuses = require('./Campuses')
const Students = require("./Students")

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:
//
// Puppy.belongsTo(Owner)

Students.belongsTo(Campuses)
Campuses.hasMany(Students, {
  foreignKey: 'campusId'
})


module.exports = {
  // Include your models in this exports object as well!
  db,
  Students,
  Campuses,
}
