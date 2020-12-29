const RequiredParamError = require('../errors/required-param')
const UnauthorizedError = require('../errors/unauthorized')

module.exports = class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      message: new RequiredParamError(paramName)
    }
  }

  static internalServerError () {
    return {
      statusCode: 500
    }
  }

  static unauthorized () {
    return {
      statusCode: 401,
      message: new UnauthorizedError()
    }
  }
}
