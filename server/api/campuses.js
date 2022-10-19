const router = require('express').Router()
const { Campuses, Students } = require("../db")

router.get('/', async (req,res,next)=>{
    const campuses = await Campuses.findAll()
    res.send(campuses)
})
router.get("/:campusId", async (req,res,next)=>{
    const campusId = req.params.campusId
    const campus = await Campuses.findAll({
        include: Students,
        where: {
            id: campusId
        }
    })
    res.send(campus[0])
})

module.exports = router