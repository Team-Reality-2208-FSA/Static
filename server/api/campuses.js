const router = require('express').Router()
const { Campuses, Students } = require("../db")

router.get('/', async (req,res,next)=>{
    const campuses = await Campuses.findAll()
    res.send(campuses)
})
router.get("/:campusId", async (req,res,next)=>{
    const campusId = req.params.campusId
    try {
    const campus = await Campuses.findAll({
        include: {
            model: Students,
            where: {
                CampusId: campusId
            }
        },
            where: {
                id: campusId,
            }
        
    })
    res.send(campus[0])
} catch(err) {
    console.log("Error in apis/campuses" , err)
}
})

module.exports = router