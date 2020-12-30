const HttpResponse = require('../helpers/http-response')

module.exports = class AcessRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.internalServerError()
    }

    const { phoneNumber, dateBirth } = httpRequest.body

    if (!phoneNumber) {
      return HttpResponse.badRequest('phoneNumber')
    }

    if (!dateBirth) {
      return HttpResponse.badRequest('dateBirth')
    }

    const acessToken = this.authUseCase.auth(phoneNumber, dateBirth)

    if (!acessToken) {
      return HttpResponse.unauthorized()
    }

    return HttpResponse.ok()
  }
}
