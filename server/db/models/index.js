const User = require('./user')
const Net = require('./net')
const Lookup = require('./lookup')
const Author = require('./author')
const Style = require('./style')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Lookup.belongsTo(Author)
// Lookup.belongsTo(Style)
// Author.belongsTo(Style)
// Author.hasMany(Lookup)
// Style.hasMany(Lookup)
// Style.hasMany(Author)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Net,
  Lookup,
  Author,
  Style
}
