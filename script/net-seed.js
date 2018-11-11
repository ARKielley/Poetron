'use strict'

const db = require('../server/db')
const { Net } = require('../server/db/models')
const { thomas, ginsberg, spenser, snyder, ashbery, fabbro, auden, shakespeare } = require('./training/data')
const {tokenizeString} = require('./training/new-approach')

