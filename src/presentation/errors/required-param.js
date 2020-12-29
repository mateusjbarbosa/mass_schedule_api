module.exports = class RequiredParamError extends Error {
  constructor (paramName) {
    super(`${paramName} is required`)
    this.name = 'RequiredParamError'
  }
}
