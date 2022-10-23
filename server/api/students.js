const router = require('express').Router()
const { Students, Campuses } = require("../db")
const { Op } = require("sequelize")

router.get('/', async (req, res, next) => {
    const students = await Students.findAll()
    res.send(students)
})

router.get("/:id", async (req, res, next) => {
    const stuId = req.params.id
    const student = await Students.findOne({
        where: {
            id: stuId
        }
    })
    const CampusId = student.dataValues.CampusId
    const stusCampus = await Campuses.findOne({
        where: {
            id: CampusId
        }
    })
    res.status(200).send({ student: student, campus: stusCampus })
})
router.post("/", async (req, res, next) => {
    const newStudent = await Students.create(req.body)
    res.send(newStudent)
})

router.delete('/:studentId', async (req, res, next) => {
    const studentId = req.params.studentId
    const deleted = await Students.destroy({
        where: {
            id: studentId
        }
    })
    console.log(deleted)
    res.sendStatus(200)
})

router.put(`/:studentId`, async (req, res, next) => {
    const studentId = req.params.studentId
    try {
    const unregistered = await Students.update({
        CampusId: null
    },
        {
            where: {
                id: studentId

            },
            returning: true
        })

    const student = unregistered[1][0].dataValues
    res.send(student)
    } catch(err) {
        console.log(err)
    }
})

router.put('/update/:studentId', async (req,res,next) => {
    const studentId = req.params.studentId
    
    try {
    const updated = await Students.update(req.body, {
        where: {
            id: studentId
        },
        returning: true
    })
    const student = updated[1][0].dataValues
   
    const campus = await Campuses.findOne({
        where: {
            id: student.CampusId
        }
    })
    console.log(student, campus)
    res.send({ student: student, campus: campus })
} catch(err) {
    console.log(err)
}
})

module.exports = router