const { User } = require('../models')
const { getUserIdFromContext, getToken } = require('../utils/auth')
const resolvers = {
  Query: {
    user: async (root, args, context, info) => {
      const user = await new User({ id: getUserIdFromContext(context) }).fetch()
      return user.toJSON()
    },
  },
  Mutation: {
    login: async (root, args, context, info) => {
      const user = await User.login(
        args.loginInput.email,
        args.loginInput.password
      )
      return {
        token: getToken(user.id),
        user: user.toJSON(),
      }
    },
    signup: async (root, args, context, info) => {
      const user = await User.register(args.newUserInput)
      await user.save()
      return {
        token: getToken(user.id),
        user: user.toJSON(),
      }
    },
  },
}

module.exports = resolvers
