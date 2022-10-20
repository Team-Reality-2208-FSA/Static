const router = require('express').Router()
const { Students, Campuses } = require("../db")
const { Op } = require("sequelize")

router.get('/', async (req,res,next)=>{
    const students = await Students.findAll()
    res.send(students)
})

router.get("/:id", async (req,res,next)=>{
    const stuId = req.params.id
    const student = await Students.findOne({
        where: {
            id: {
                [Op.eq]: stuId
            }
        }
    })

    res.send(student)
})

module.exports = router