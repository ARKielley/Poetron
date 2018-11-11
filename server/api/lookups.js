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

router.get('/names', async (req, res, next) => {
  try {
    const allNames = await Lookup.findAll(
      {where: {type: 'author'}},
      {include: ['category']}
    )
    res.json(allNames)
  } catch (err) {
    next(err)
  }
})

router.get('/genres', async (req, res, next) => {
  try {
    const allGenres = await Lookup.findAll(
      {where: {type: 'genre'}},
      {include: ['category']}
    )
    res.json(allGenres)
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