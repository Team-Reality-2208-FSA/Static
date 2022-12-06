
const router = require('express').Router()
const { applyMiddleware } = require('@reduxjs/toolkit')
const fs = require('fs')
const counties = require('../counties.json')

router.get("/all", async (req, res, next) => {
    const response = counties
    res.send(response)
})

// router.get('/:county', async (req,res,next)=>{
//     const county = req.params
//     const geoJson = await fetch('')
//     console.log(geoJson)
//     res.send(geoJson)
// })

module.exports = router