const router = require('express').Router()
const { Net } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const queries = Object.keys(req.query)
    const nets = await Net.findAll()
    res.json(nets)
  } catch (err) {
    next(err)
  }
})

