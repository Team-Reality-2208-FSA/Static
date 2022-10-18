const  Sequelize   = require("sequelize")
const db = require("./database")

const Students = db.define("Students", {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: ".../"
    },
    gpa: {
        type: Sequelize.DECIMAL,
        validate: {
            max: 4.0,
            min: 0.0
        }
    }
})

module.exports = Students