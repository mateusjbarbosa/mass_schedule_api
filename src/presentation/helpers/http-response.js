const RequiredParamError = require('../errors/required-param')
const UnauthorizedError = require('../errors/unauthorized')

module.exports = class HttpResponse {
  static ok () {
    return {
      statusCode: 200
    }
  }

  static badRequest (paramName) {
    return {
      statusCode: 400,
      message: new RequiredParamError(paramName)
    }
  }

  static unauthorized () {
    return {
      statusCode: 401,
      message: new UnauthorizedError()
    }
  }

  static internalServerError () {
    return {
      statusCode: 500
    }
  }
}
