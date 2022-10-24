const router = require('express').Router()
const { Students, Campuses } = require("../db")

// request for all students
router.get('/', async (req, res, next) => {
    try {
        const students = await Students.findAll()
        res.send(students)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// retrieving student based on id
router.get("/:id", async (req, res, next) => {
    const stuId = req.params.id
    try {
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
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// posting new student to the database
router.post("/", async (req, res, next) => {
    try {
        const newStudent = await Students.create(req.body)
        res.send(newStudent)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

//deleting student from the database
router.delete('/:studentId', async (req, res, next) => {
    const studentId = req.params.studentId
    try {
        const deleted = await Students.destroy({
            where: {
                id: studentId
            }
        })
        console.log(deleted)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// updating student to unregister them from a campus
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
    } catch (err) {
        console.log(err)
        next(err)
    }
})

//updating student
router.put('/update/:studentId', async (req, res, next) => {
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
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// Custom error handler
router.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send("Uh Oh Something went wrong!")
})

module.exports = router