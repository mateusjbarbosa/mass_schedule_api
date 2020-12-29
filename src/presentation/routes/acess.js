const HttpResponse = require('../helpers/http-response')

module.exports = class AcessRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.internalServerError()
    }

    const { phoneNumber, dateBirth } = httpRequest.body

    if (!phoneNumber) {
      return HttpResponse.badRequest('phoneNumber')
    }

    if (!dateBirth) {
      return HttpResponse.badRequest('dateBirth')
    }

    this.authUseCase.auth(phoneNumber, dateBirth)

    return HttpResponse.unauthorized()
  }
}
