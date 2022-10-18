const router = require('express').Router()
const { Campuses } = require("../db")

router.get('/', async (req,res,next)=>{
    const campuses = await Campuses.findAll()
    res.send(campuses)
})

module.exports = router