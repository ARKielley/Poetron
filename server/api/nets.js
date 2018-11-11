const router = require('express').Router()
const { Net } = require('../db/models')
const createNick = require('../../script/training/test.js')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // const queries = Object.keys(req.query)
    const nets = await Net.findAll({where: req.query})
    res.json(nets)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newNet = await Net.create(req.body)
    console.log('success?: ', newNet)
    res.json(newNet)
  } catch (err) {
    next(err)
  }
})

router.post('/nick', async (req, res, next) => {
  try {
    const nickJSON = createNick()
    const newNick = await Net.create({category: 'poetron-special', data: nickJSON})
    res.json(newNick)
  } catch (err) {
    next(err)
  }
})