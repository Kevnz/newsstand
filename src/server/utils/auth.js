const jwt = require('jsonwebtoken')

const { UnauthenticatedError } = require('../errors')
function getUserId(token) {
  const { userId } = jwt.verify(token, process.env.APP_SECRET)
  return userId
}

function getUserIdFromContext(context) {
  const authorization = context.request.headers.authorization
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    return getUserId(token)
  }

  throw new UnauthenticatedError()
}

function getToken(id) {
  return jwt.sign({ userId: id }, process.env.APP_SECRET)
}

module.exports = {
  getUserId,
  getUserIdFromContext,
  getToken,
}
