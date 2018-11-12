'use strict'

const db = require('../server/db')
const { User, Lookup } = require('../server/db/models')
const { thomas, ginsberg, spenser, snyder, ashbery, fabbro, auden, shakespeare } = require('./training/data')
const { buildLookupFromAuthor, filterAuthor, mergeLookups } = require('./training/new-approach')

const thomasLookup = buildLookupFromAuthor(filterAuthor(thomas, 0.6, 0.7))
const ginsbergLookup = buildLookupFromAuthor(filterAuthor(ginsberg, 0.6, 0.7))
const spenserLookup = buildLookupFromAuthor(filterAuthor(spenser, 0.6, 0.7))
const snyderLookup = buildLookupFromAuthor(filterAuthor(snyder, 0.6, 0.7))
const ashberyLookup = buildLookupFromAuthor(filterAuthor(ashbery, 0.6, 0.7))
const fabbroLookup = buildLookupFromAuthor(filterAuthor(fabbro, 0.6, 0.7))
const audenLookup = buildLookupFromAuthor(filterAuthor(auden, 0.6, 0.7))
const shakespeareLookup = buildLookupFromAuthor(filterAuthor(shakespeare, 0.6, 0.7))

const specialLookup = thomasLookup
const beatLookup = mergeLookups(ginsbergLookup, snyderLookup)
const elizabethanLookup = mergeLookups(spenserLookup, shakespeareLookup)
const modernismLookup = mergeLookups(audenLookup, fabbroLookup)
const newYorkSchoolLookup = ashberyLookup

const allLookup = mergeLookups(specialLookup, beatLookup, elizabethanLookup, modernismLookup, newYorkSchoolLookup)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const lookups = await Promise.all([
    Lookup.create({type: 'author', category: 'thomas-delahaye', data: thomasLookup}),
    Lookup.create({type: 'author', category: 'allen-ginsberg', data: ginsbergLookup}),
    Lookup.create({type: 'author', category: 'edmund-spenser', data: spenserLookup}),
    Lookup.create({type: 'author', category: 'gary-snyder', data: snyderLookup}),
    Lookup.create({type: 'author', category: 'john-ashbery', data: ashberyLookup}),
    Lookup.create({type: 'author', category: 'miglior-fabbro', data: fabbroLookup}),
    Lookup.create({type: 'author', category: 'w-h-auden', data: audenLookup}),
    Lookup.create({type: 'author', category: 'william-shakespeare', data: shakespeareLookup}),
    Lookup.create({type: 'genre', category: 'poetron-special', data: specialLookup}),
    Lookup.create({type: 'genre', category: 'beat', data: beatLookup}),
    Lookup.create({type: 'genre', category: 'elizabethan', data: elizabethanLookup}),
    Lookup.create({type: 'genre', category: 'modernism', data: modernismLookup}),
    Lookup.create({type: 'genre', category: 'new-york-school', data: newYorkSchoolLookup}),
    Lookup.create({type: 'all', category: 'all', data: allLookup})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${lookups.length} lookups`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
