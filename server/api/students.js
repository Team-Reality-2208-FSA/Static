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
            id:  stuId
        }
    })
    const CampusId = student.dataValues.CampusId
    const stusCampus = await Campuses.findOne({
        where: {
            id: CampusId
        }
    })
    console.log(stusCampus)
    res.status(200).send({student:student, campus:stusCampus})
})
router.post("/", async (req,res,next)=>{
    const newStudent = await Students.create(req.body)
    res.send(newStudent)
})

module.exports = router