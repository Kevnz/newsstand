const bookshelf = require('../bookshelf')
const User = require('./user')

const Users = bookshelf.Collection.extend({
  model: User,
})

module.exports = {
  User,
  Users,
}
