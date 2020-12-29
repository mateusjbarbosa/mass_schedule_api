const RequiredParamError = require('../errors/required-param')

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
}
