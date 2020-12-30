const UnauthorizedError = require('../errors/unauthorized')
const ServerError = require('../errors/server')

module.exports = class HttpResponse {
  static ok (data) {
    return {
      statusCode: 200,
      message: data
    }
  }

  static badRequest (error) {
    return {
      statusCode: 400,
      message: error
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
