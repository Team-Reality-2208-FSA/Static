const router = require('express').Router()
const { Students } = require("../db")

router.get('/', async (req,res,next)=>{
    const campuses = await Students.findAll()
    res.send(campuses)
})

module.exports = router