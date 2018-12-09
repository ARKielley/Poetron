const router = require('express').Router()
const { Net } = require('../db/models')
const tokenizeString = require('../../script/training/new-approach')
const runNet = require('../util')
// const authorNetFunction = require('../util/author-net-function')
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

router.get('/:name', async (req, res, next) => {
  try {
    const net = await Net.findOne({where: {name: req.params.name}})
    console.log(net.miniBackEndRun(['a']))
    res.json(net)
  } catch (err) {
    next(err)
  }
})

// router.post('/help', (req, res, next) => {

//     const detectedIndex = authorNetFunction(tokenizeString(req.body.text)).match(/\n/)[0]
//     res.send(detectedIndex)

// })

// router.post('/', async (req, res, next) => {
//   try {
//     const newNet = await Net.create(req.body)
//     console.log('success?: ', newNet)
//     res.json(newNet)
//   } catch (err) {
//     next(err)
//   }
// })
