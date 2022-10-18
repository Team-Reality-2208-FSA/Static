const  Sequelize  = require("sequelize")
const db = require("./database")


const Campus = db.define("Campus",{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: ".../"

    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    
}) 

module.exports = Campus