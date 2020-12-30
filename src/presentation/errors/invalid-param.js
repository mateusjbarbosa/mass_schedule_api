module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super(`${paramName} is invalid`)
    this.name = 'InvalidParamError'
  }
}
