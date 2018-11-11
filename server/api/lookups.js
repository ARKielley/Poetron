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

router.get('/:category', async (req, res, next) => {
  try {
    console.log('got here')
    const lookup = await Lookup.findOne({where: { category: req.params.category }})
    console.log(lookup)
    res.json(lookup)
  } catch (err) {
    next(err)
  }
})

router.get('/')