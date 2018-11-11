const router = require('express').Router()
const { Lookup } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLookups = await Lookup.findAll()
    res.json(allLookups)
  } catch (err) {
    next(err)
  }
})

router.get('/')