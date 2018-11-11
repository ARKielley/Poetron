'use strict'

const db = require('../server/db')
const { User, Lookup } = require('../server/db/models')
const { thomas, ginsberg, spenser, snyder, ashbery, fabbro, auden, shakespeare } = require('./training/data')
const { buildLookupFromAuthor, filterAuthor } = require('./training/new-approach')

const thomasLookup = buildLookupFromAuthor(filterAuthor(thomas, 0.3, 0.3))
const ginsbergLookup = buildLookupFromAuthor(filterAuthor(ginsberg, 0.3, 0.3))
const spenserLookup = buildLookupFromAuthor(filterAuthor(spenser, 0.3, 0.3))
const snyderLookup = buildLookupFromAuthor(filterAuthor(snyder, 0.3, 0.3))
const ashberyLookup = buildLookupFromAuthor(filterAuthor(ashbery, 0.3, 0.3))
const fabbroLookup = buildLookupFromAuthor(filterAuthor(fabbro, 0.3, 0.3))
const audenLookup = buildLookupFromAuthor(filterAuthor(auden, 0.3, 0.3))
const shakespeareLookup = buildLookupFromAuthor(filterAuthor(shakespeare, 0.3, 0.3))

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const lookups = await Promise.all([
    Lookup.create({category: 'thomas-delahaye', data: thomasLookup}),
    Lookup.create({category: 'allen-ginsberg', data: ginsbergLookup}),
    Lookup.create({category: 'edmund-spenser', data: spenserLookup}),
    Lookup.create({category: 'gary-snyder', data: snyderLookup}),
    Lookup.create({category: 'john-ashbery', data: ashberyLookup}),
    Lookup.create({category: 'miglior-fabbro', data: fabbroLookup}),
    Lookup.create({category: 'w-h-auden', data: audenLookup}),
    Lookup.create({category: 'william-shakespeare', data: shakespeareLookup}),
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
