const RequiredParamError = require('../errors/required-param')
const UnauthorizedError = require('../errors/unauthorized')
const ServerError = require('../errors/server')

module.exports = class HttpResponse {
  static ok (data) {
    return {
      statusCode: 200,
      message: data
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
      statusCode: 500,
      message: new ServerError()
    }
  }
}
