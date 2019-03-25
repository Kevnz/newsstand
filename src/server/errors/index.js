class InvalidPasswordError extends Error {}
class UnauthenticatedError extends Error {}

module.exports = {
  InvalidPasswordError,
  UnauthenticatedError,
}
