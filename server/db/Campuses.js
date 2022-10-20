const  Sequelize  = require("sequelize")
const db = require("./database")


const Campuses = db.define("Campuses",{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "https://news.belmont.edu/wp-content/uploads/2019/07/The-Lawn.jpg"

    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "Campus Description"
    },
    
}) 

module.exports = Campuses