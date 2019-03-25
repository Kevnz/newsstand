const bcrypt = require('bcrypt')
const bookshelf = require('../bookshelf')

module.exports = bookshelf.model(
  'User',
  {
    tableName: 'users',
    idAttribute: 'id',
    hidden: ['password'],
  },
  {
    login: async function(email, password) {
      if (!email || !password) {
        throw new Error('Email and password are both required')
      }
      return new this({ email: email.toLowerCase().trim() })
        .fetch()
        .tap(user => {
          if (user === null) return null
          return bcrypt
            .compare(password, user.get('password'))
            .then(function compareResponse(res) {
              if (!res) throw new Error('Invalid password')
              return user
            })
        })
    },
    register: async function({ firstName, lastName, email, password }) {
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = await bcrypt.hashSync(password, salt)
      return new this({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }).save()
    },
  }
)
