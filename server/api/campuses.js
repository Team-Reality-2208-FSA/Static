const router = require('express').Router()
const { applyMiddleware } = require('@reduxjs/toolkit')
const { Campuses, Students } = require("../db")

// request fro all campuses
router.get('/', async (req, res, next) => {
    try {
        const campuses = await Campuses.findAll()
        res.send(campuses)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// retrieving campus from database base on student id parameter
router.get("/:campusId", async (req, res, next) => {
    const campusId = req.params.campusId
    try {
        const campus = await Campuses.findAll({
            include: {
                model: Students,
                required: false,
                where: {
                    CampusId: campusId
                }
            },
            where: {
                id: campusId,
            }

        })
        res.send(campus[0])
    } catch (err) {
        console.log("Error in apis/campuses", err)
        next(err)
    }
})

// posting new campus to the database
router.post('/', async (req, res, next) => {
    try {
        const newCampus = await Campuses.create(req.body)
        res.send(newCampus)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

//deleting campuses
router.delete('/:campusId', async (req, res, next) => {
    const campusId = req.params.campusId
    try {
        const deleted = await Campuses.destroy({
            where: {
                id: campusId
            }
        })
        console.log(deleted)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

//updating campuses
router.put("/:campusId", async (req, res, next) => {
    const campusId = req.params.campusId
    const campusToUpdate = req.body
    console.log("trying to update with:", campusToUpdate)
    try {
        const updated = await Campuses.update(req.body, {
            where: {
                id: campusId
            },
            returning: true,
        })
        const updatedCampus = updated[1][0].dataValues
        res.status(200).send(updatedCampus)
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